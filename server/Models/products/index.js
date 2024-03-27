import { DataTypes } from "sequelize";
import sequelize from "../../database/db-details.js"; // Assuming this path is correct and exports your Sequelize instance

const productModel = sequelize.define(
  "Product", // Model name
  {
    // Model attributes
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false, // NOT NULL
    },
    category: { // Note: You had "catagory" in your SQL. Assuming a typo and correcting to "category".
      type: DataTypes.STRING(200),
      allowNull: false, // NOT NULL
    },
    img: {
      type: DataTypes.TEXT, // Assuming the images are stored as URLs. You can adjust the type based on your actual use case.
      allowNull: false, // NOT NULL
    },
    description: {
      type: DataTypes.TEXT, // Changed to TEXT for potentially longer descriptions.
      allowNull: false, // NOT NULL
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false, // NOT NULL
      validate: {
        min: 1, // CHECK(price>0)
      },
    },
    rating: {
      type: DataTypes.REAL,
      validate: {
        min: 0, // CHECK(rating > -1)
        max: 5, // AND rating<6
      },
    },
  },
  {
    // Model options
    paranoid: true, // Enable soft deletes
  }
);

export default productModel;
