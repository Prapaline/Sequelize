import sequelize from "../config/db.js";
import Categorie from "./categorie.js";
import Produit from "./produit.js";

const syncDB = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("✅ Base de données synchronisée");
    } catch (error) {
        console.error("❌ Erreur de synchronisation :", error);
    }
};

export { sequelize, Categorie, Produit, syncDB };
