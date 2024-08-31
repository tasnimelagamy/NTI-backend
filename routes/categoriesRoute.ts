import {Router} from "express"
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categories";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from './../utils/validation/categoriesValidator';
import subcategoriesRoute from "./subcategoriesRoute";

const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategories', subcategoriesRoute);

categoriesRoute.route('/')
.get(getCategories)
.post(createCategoryValidator,createCategory)

categoriesRoute.route('/:id')
.get(getCategoryValidator,getCategory)
.put(updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory)



export default categoriesRoute;