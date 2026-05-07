import app, { connectToDatabase, getDatabaseErrorMessage } from "./app.js";

const port = Number(process.env.PORT ?? 4000);

connectToDatabase().catch((error) => {
  console.error(`MongoDB startup connection failed: ${getDatabaseErrorMessage(error)}`);
});

app.listen(port, () => {
  console.log(`Glossy Vercel API listening on http://localhost:${port}`);
});
