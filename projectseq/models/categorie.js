import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Categorie = sequelize.define("Categorie", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false
});

export default Categorie;
