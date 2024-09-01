import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categories";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validation/categoriesValidator";
import subcategoriesRoute from "./subcategoriesRoute";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";

const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategories', subcategoriesRoute);

categoriesRoute.route('/')
  .get(getCategories)
  .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), createCategoryValidator, createCategory);

categoriesRoute.route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateCategoryValidator, updateCategory)
  .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteCategoryValidator, deleteCategory);

export default categoriesRoute;