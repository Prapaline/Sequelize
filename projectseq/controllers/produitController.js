import Produit from "../models/produit.js";

export const getProduits = async (req, res) => {
    const produits = await Produit.findAll();
    res.json(produits);
};

export const getProduitById = async (req, res) => {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit introuvable" });
    res.json(produit);
};

export const createProduit = async (req, res) => {
    try {
        const produit = await Produit.create(req.body);
        res.status(201).json(produit);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création", error });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nom, description, prix, stock, categorieId } = req.body;

    try {
        const product = await Produit.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        if (prix && (prix < 10 || prix > 500)) {
            return res.status(400).json({ message: "Le prix doit être compris entre 10 et 500." });
        }

        if (stock < 0) {
            return res.status(400).json({ message: "Le stock ne peut pas être négatif." });
        }

        product.nom = nom || product.nom;
        product.description = description || product.description;
        product.prix = prix || product.prix;
        product.stock = stock || product.stock;
        product.categorieId = categorieId || product.categorieId;

        await product.save();

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la mise à jour du produit", error: error.message });
    }
};

export const deleteProduit = async (req, res) => {
    await Produit.destroy({ where: { id: req.params.id } });
    res.json({ message: "Produit supprimé avec succès" });
};
