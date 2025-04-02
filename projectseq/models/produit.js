import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Categorie from "./categorie.js";

const Produit = sequelize.define("Produit", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 10,
            max: 500
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    codeEAN: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
});

Produit.belongsTo(Categorie, { foreignKey: "categorieId", onDelete: "CASCADE" });
Categorie.hasMany(Produit, { foreignKey: "categorieId" });

export default Produit;
