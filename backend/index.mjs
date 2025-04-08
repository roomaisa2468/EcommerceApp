import express from "express";
import mongoose from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import cartRoutes from "./routes/cartRoutes.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import chalk from "chalk";
import cors from "cors";
import connectToDB from "./db/index.mjs";
import path from "path";

//Connecting MongoDB
connectToDB();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://ecommerce-app-three-phi.vercel.app/",
      "https://ecommerce-app-production-fbc7.up.railway.app",
      /\.vercel\.app$/, // Wildcard for all Vercel subdomains
      /\.up\.railway\.app$/, // Wildcard for all Railway subdomains
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const __dirname = path.resolve();

// Serve static frontend files
app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json());
const port = 5000;
app.use("/api/auth", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method: ", req.method);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
