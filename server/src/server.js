import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
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
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:3000";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: clientOrigin,
  }),
);
app.use(express.json());

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
  response.json({ ok: true });
});

app.get("/api/works", async (request, response, next) => {
  try {
    const page = Math.max(Number(request.query.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(request.query.limit ?? 6), 1), 24);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Work.find().sort({ createdAt: 1 }).skip(skip).limit(limit).lean(),
      Work.countDocuments(),
    ]);

    response.json({
      items,
      page,
      pages: Math.max(Math.ceil(total / limit), 1),
      total,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/works", requireAdminKey, upload.single("photo"), async (request, response, next) => {
  try {
    const title = typeof request.body.title === "string" ? request.body.title.trim() : "";

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
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    return response.status(201).json({ item: work });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "Server error" });
});

async function start() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  app.listen(port, () => {
    console.log(`Glossy API listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
