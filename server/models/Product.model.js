import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  category: {
    type: DataTypes.STRING,
  },
});

export default Product;



// const Product = sequelize.define("Product", {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },

//   slug: {
//     type: DataTypes.STRING,
//     unique: true,
//   },

//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },

//   discountPrice: {
//     type: DataTypes.FLOAT,
//   },

//   description: {
//     type: DataTypes.TEXT,
//   },

//   shortDescription: {
//     type: DataTypes.STRING,
//   },

//   image: {
//     type: DataTypes.STRING,
//   },

//   brand: {
//     type: DataTypes.STRING,
//   },

//   stock: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//   },

//   sku: {
//     type: DataTypes.STRING,
//     unique: true,
//   },

//   category: {
//     type: DataTypes.STRING,
//   },

//   rating: {
//     type: DataTypes.FLOAT,
//     defaultValue: 0,
//   },

//   numReviews: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//   },

//   isFeatured: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },

//   isActive: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//   },
// });