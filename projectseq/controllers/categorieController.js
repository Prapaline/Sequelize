import { QueryTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Categorie from '../models/categorie.js';
import Produit from '../models/produit.js';
export const getCategories = async (req, res) => {
    const categories = await Categorie.findAll();
    res.json(categories);
};

export const getCategorieById = async (req, res) => {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ message: "Catégorie introuvable" });
    res.json(categorie);
};

export const createCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.create(req.body);
        res.status(201).json(categorie);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création", error });
    }
};

export const updateCategoryById = async (req, res) => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const category = await Categorie.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }

        category.nom = nom || category.nom;
        category.description = description || category.description;

        await category.save();

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie", error: error.message });
    }
};

export const deleteCategorie = async (req, res) => {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ message: "Catégorie introuvable" });

    const produits = await categorie.getProduits();
    if (produits.length > 0) {
        return res.status(400).json({ message: "Impossible de supprimer, cette catégorie contient des produits" });
    }

    await categorie.destroy();
    res.json({ message: "Catégorie supprimée avec succès" });
};

export const getProductsCountByCategory = async (req, res) => {
    try {
        const query = `
            SELECT c.nom, COUNT(p.id) AS nombre_de_produits
            FROM categories c
            LEFT JOIN produits p ON c.id = p.categorieId
            GROUP BY c.id;
        `;
        const result = await sequelize.query(query, { type: QueryTypes.SELECT });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération du nombre de produits par catégorie', error: err });
    }
};

export const getCategoriesWithAtLeastFiveProducts = async (req, res) => {
    try {
        const query = `
            SELECT c.nom, COUNT(p.id) AS nombre_de_produits
            FROM categories c
            LEFT JOIN produits p ON c.id = p.categorieId
            GROUP BY c.id
            HAVING COUNT(p.id) >= 5;
        `;
        const result = await sequelize.query(query, { type: QueryTypes.SELECT });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des catégories avec au moins 5 produits', error: err });
    }
};

export const getAveragePriceByCategory = async (req, res) => {
    try {
        const query = `
            SELECT c.nom, AVG(p.prix) AS moyenne_prix
            FROM categories c
            LEFT JOIN produits p ON c.id = p.categorieId
            GROUP BY c.id;
        `;
        const result = await sequelize.query(query, { type: QueryTypes.SELECT });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la moyenne des prix par catégorie', error: err });
    }
};

export const getCategoriesWithAveragePriceGreaterThan100 = async (req, res) => {
    try {
        const query = `
            SELECT c.nom, AVG(p.prix) AS moyenne_prix
            FROM categories c
            LEFT JOIN produits p ON c.id = p.categorieId
            GROUP BY c.id
            HAVING AVG(p.prix) > 100;
        `;
        const result = await sequelize.query(query, { type: QueryTypes.SELECT });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des catégories avec une moyenne des prix > 100', error: err });
    }
};

export const getOutOfStockProducts = async (req, res) => {
    try {
        const query = `
            SELECT p.nom, p.stock
            FROM produits p
            WHERE p.stock = 0;
        `;
        const result = await sequelize.query(query, { type: QueryTypes.SELECT });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits en rupture de stock', error: err });
    }
};