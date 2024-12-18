import express from "express"
import {viewProductAction,addProductAction,addProductPage,deleteProduct,editProductAction,editProductPage} from "../controller/product.controller.js";
// import{addProductPage,addProductAction} from "../controller/product.controller.js"
import { verify } from "../middleware/authentication.js"
const productrouter=express.Router()

productrouter.get("/add-product",verify,addProductPage)
productrouter.post("/add-product",verify,addProductAction)

productrouter.get("/view-product",viewProductAction);


productrouter.get("/delete/:productId",verify,deleteProduct);
productrouter.get("/edit/:productId",verify,editProductPage);
productrouter.post("/edit-product",verify,editProductAction);
export default  productrouter