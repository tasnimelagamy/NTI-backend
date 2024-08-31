"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../controllers/categories");
const categoriesRoute = (0, express_1.Router)();
categoriesRoute.route('/')
    .get(categories_1.getCategories)
    .post(categories_1.createCategory);
categoriesRoute.route('/:id')
    .get(categories_1.getCategory)
    .put(categories_1.updateCategory)
    .delete(categories_1.deleteCategory);
exports.default = categoriesRoute;
