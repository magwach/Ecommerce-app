import express, { json } from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import router from "./routes/product.routes.js";
import dotenv from "dotenv";
import path, { resolve } from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend/dist", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://localhost:` + port);
});
