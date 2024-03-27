import { DataTypes } from "sequelize";
import sequelize from "../../database/db-details.js"; // Ensure this is the correct path to your Sequelize instance

const cartModel = sequelize.define(
  "Cart", // Model name
  {
    // Model attributes
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { // Reflecting the user_id column as a foreign key
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // This is the table name of the User model. Ensure it matches exactly, including case sensitivity.
        key: 'id',
      },
    },
    productId: { // Reflecting the products_id column as a foreign key
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', // This is the table name of the Product model. Ensure it matches exactly, including case sensitivity.
        key: 'id',
      },
    },
  },
  {
    // Model options
    // Add any additional options here
  }
);

export default cartModel;
