import express from "express";
import { getProduits, getProduitById, updateProduct, createProduit, deleteProduit } from "../controllers/produitController.js";

const router = express.Router();

router.get("/", getProduits);
router.get("/:id", getProduitById);
router.post("/", createProduit);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduit);

export default router;
