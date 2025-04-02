import express from "express";
import { getCategories, updateCategoryById, getCategorieById, createCategorie, deleteCategorie, getProductsCountByCategory, getCategoriesWithAtLeastFiveProducts, getAveragePriceByCategory, getCategoriesWithAveragePriceGreaterThan100, getOutOfStockProducts } from "../controllers/categorieController.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategorieById);
router.put("/:id", updateCategoryById);
router.post("/", createCategorie);
router.delete("/:id", deleteCategorie);
router.get('/stats/produits-count', getProductsCountByCategory);
router.get('/stats/categories-plus-cinq-produits', getCategoriesWithAtLeastFiveProducts);
router.get('/stats/moyenne-prix', getAveragePriceByCategory);
router.get('/stats/categories-prix-superieur-100', getCategoriesWithAveragePriceGreaterThan100);
router.get('/stats/rupture-stock', getOutOfStockProducts);
export default router;
