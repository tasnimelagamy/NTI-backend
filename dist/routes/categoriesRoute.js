"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../controllers/categories");
const categoriesValidator_1 = require("../utils/validation/categoriesValidator");
const subcategoriesRoute_1 = __importDefault(require("./subcategoriesRoute"));
const auth_1 = require("../controllers/auth");
const categoriesRoute = (0, express_1.Router)();
categoriesRoute.use('/:categoryId/subcategories', subcategoriesRoute_1.default);
categoriesRoute.route('/')
    .get(categories_1.getCategories)
    .post(auth_1.protectRoutes, auth_1.checkActive, (0, auth_1.allowedTo)('manager', 'admin'), categoriesValidator_1.createCategoryValidator, categories_1.createCategory);
categoriesRoute.route('/:id')
    .get(categoriesValidator_1.getCategoryValidator, categories_1.getCategory)
    .put(auth_1.protectRoutes, auth_1.checkActive, (0, auth_1.allowedTo)('manager', 'admin'), categoriesValidator_1.updateCategoryValidator, categories_1.updateCategory)
    .delete(auth_1.protectRoutes, auth_1.checkActive, (0, auth_1.allowedTo)('manager', 'admin'), categoriesValidator_1.deleteCategoryValidator, categories_1.deleteCategory);
exports.default = categoriesRoute;
