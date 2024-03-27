import userModel from "../Models/user/index.js";
//import productModel from "../model/product/index.js"; // Adjust path as necessary
import productModel from "../Models/products/index.js";
import cartModel from "../Models/cart/index.js";
//import cartModel from "../model/cart/index.js"; // Adjust path as necessary
// Import other models as necessary

const dbinit = async () => {
    await userModel.sync({
        alter: true,
        force: false
    });
    await productModel.sync({
        alter: true,
        force: false
    });
    await cartModel.sync({
        alter: true,
        force: false
    });
    // Sync other models as necessary
}

export default dbinit;
