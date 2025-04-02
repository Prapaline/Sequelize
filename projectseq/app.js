import express from "express";
import dotenv from "dotenv";
import { syncDB } from "./models/index.js";
import categorieRoutes from "./routes/categorieRoutes.js";
import produitRoutes from "./routes/produitRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/categories", categorieRoutes);
app.use("/produits", produitRoutes);

syncDB();

app.listen(4000, () => console.log("🚀 Serveur sur le port 4000"));
