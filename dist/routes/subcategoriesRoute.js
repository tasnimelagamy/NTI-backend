"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategories_1 = require("../controllers/subcategories");
const subcategoriesRoute = (0, express_1.Router)();
subcategoriesRoute.route('/')
    .get(subcategories_1.getSubCategories)
    .post(subcategories_1.createSubCategory);
subcategoriesRoute.route('/:id')
    .get(subcategories_1.getSubCategory)
    .put(subcategories_1.updateSubCategory)
    .delete(subcategories_1.deleteSubCategory);
exports.default = subcategoriesRoute;
