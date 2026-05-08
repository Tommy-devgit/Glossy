import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import dns from "node:dns";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { Work } from "./models/Work.js";

dotenv.config();

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

const port = Number(process.env.PORT ?? 4000);
const clientOrigins = (process.env.CLIENT_ORIGIN ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const databaseTimeoutMs = Number(process.env.MONGODB_TIMEOUT_MS ?? 8000);
const workCategories = ["Religious", "Wedding", "Portrait", "Art"];
const legacyCategoryMap = {
  Traditional: "Portrait",
  Ordinary: "Wedding",
  Historical: "Art",
  Landscape: "Art",
};
let databaseConnectionPromise = null;

const dnsServers = process.env.DNS_SERVERS?.split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers?.length) {
  dns.setServers(dnsServers);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: clientOrigins,
  }),
);
app.use(express.json());

function getDatabaseErrorMessage(error) {
  if (error?.code === "ECONNREFUSED" && error?.syscall === "querySrv") {
    return [
      `DNS refused the MongoDB SRV lookup for ${error.hostname}.`,
      "Node.js cannot resolve your mongodb+srv:// URI through the current DNS path.",
      "Set DNS_SERVERS=1.1.1.1,8.8.8.8 if those resolvers are reachable,",
      "or replace MONGODB_URI with a non-SRV mongodb:// seedlist URI from MongoDB Atlas.",
    ].join(" ");
  }

  return error instanceof Error ? error.message : "Database connection failed";
}

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  databaseConnectionPromise ??= mongoose
    .connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: databaseTimeoutMs,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      databaseConnectionPromise = null;
      throw error;
    });

  await databaseConnectionPromise;
}

async function requireDatabase(_request, response, next) {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    const message = getDatabaseErrorMessage(error);
    console.error(`MongoDB unavailable: ${message}`);
    response.status(503).json({ message });
  }
}

function requireAdminKey(request, response, next) {
  const expectedKey = process.env.ADMIN_KEY;
  const providedKey = request.header("x-admin-key");

  if (!expectedKey) {
    return response.status(500).json({ message: "ADMIN_KEY is not configured" });
  }

  if (!providedKey || providedKey !== expectedKey) {
    return response.status(401).json({ message: "Invalid admin key" });
  }

  return next();
}

function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "glossy/works",
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve(result);
      },
    );

    stream.end(fileBuffer);
  });
}

app.get("/health", (_request, response) => {
  response.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.post("/api/admin/verify", requireAdminKey, (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/works", requireDatabase, async (request, response, next) => {
  try {
    const page = Math.max(Number(request.query.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(request.query.limit ?? 6), 1), 100);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Work.find().select("title category imageUrl createdAt").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Work.countDocuments(),
    ]);

    response.json({
      items: items.map((item) => ({
        ...item,
        category: legacyCategoryMap[item.category] ?? item.category,
      })),
      page,
      pages: Math.max(Math.ceil(total / limit), 1),
      total,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/works", requireAdminKey, requireDatabase, upload.single("photo"), async (request, response, next) => {
  try {
    const title = typeof request.body.title === "string" ? request.body.title.trim() : "";
    const category = workCategories.includes(request.body.category) ? request.body.category : "Portrait";

    if (!title) {
      return response.status(400).json({ message: "Title is required" });
    }

    if (!request.file) {
      return response.status(400).json({ message: "Photo is required" });
    }

    if (!request.file.mimetype.startsWith("image/")) {
      return response.status(400).json({ message: "Upload an image file" });
    }

    const uploadResult = await uploadToCloudinary(request.file.buffer);
    const work = await Work.create({
      title,
      category,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    return response.status(201).json({ item: work });
  } catch (error) {
    return next(error);
  }
});

app.patch("/api/works/:id", requireAdminKey, requireDatabase, upload.single("photo"), async (request, response, next) => {
  try {
    const work = await Work.findById(request.params.id);

    if (!work) {
      return response.status(404).json({ message: "Work not found" });
    }

    const title = typeof request.body.title === "string" ? request.body.title.trim() : "";
    const category = workCategories.includes(request.body.category) ? request.body.category : work.category;
    let previousPublicId = null;

    if (!title) {
      return response.status(400).json({ message: "Title is required" });
    }

    work.title = title;
    work.category = category;

    if (request.file) {
      if (!request.file.mimetype.startsWith("image/")) {
        return response.status(400).json({ message: "Upload an image file" });
      }

      const uploadResult = await uploadToCloudinary(request.file.buffer);
      previousPublicId = work.publicId;
      work.imageUrl = uploadResult.secure_url;
      work.publicId = uploadResult.public_id;
    }

    await work.save();

    if (previousPublicId) {
      cloudinary.uploader.destroy(previousPublicId).catch((error) => {
        console.error(`Cloudinary cleanup failed for ${previousPublicId}:`, error);
      });
    }

    return response.json({ item: work });
  } catch (error) {
    return next(error);
  }
});

app.delete("/api/works/:id", requireAdminKey, requireDatabase, async (request, response, next) => {
  try {
    const work = await Work.findByIdAndDelete(request.params.id);

    if (!work) {
      return response.status(404).json({ message: "Work not found" });
    }

    cloudinary.uploader.destroy(work.publicId).catch((error) => {
      console.error(`Cloudinary cleanup failed for ${work.publicId}:`, error);
    });

    return response.json({ ok: true });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "Server error" });
});

async function start() {
  connectToDatabase().catch((error) => {
    console.error(`MongoDB startup connection failed: ${getDatabaseErrorMessage(error)}`);
  });

  app.listen(port, () => {
    console.log(`Glossy API listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
