import express from "express";
import {viewcategoryAction,addcategoryAction,addcategorypage, deleteCategory,editCategoryAction,editCategoryPage} from "../controller/category.controller.js"

import { verify } from "../middleware/authentication.js";
const cat_router = express.Router();
cat_router.get('/add-category',verify , addcategorypage);
cat_router.post('/add-category',verify, addcategoryAction) ;
cat_router.get('/view-category',verify, viewcategoryAction)
cat_router.get('/delete/:categoryId',verify,deleteCategory)

cat_router.get("/edit/:categoryId",verify,editCategoryPage);
cat_router.post("/edit-category",verify,editCategoryAction);
export default cat_router;