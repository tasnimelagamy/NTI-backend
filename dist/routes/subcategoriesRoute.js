"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategories_1 = require("../controllers/subcategories");
const subcategoriesValidator_1 = require("../utils/validation/subcategoriesValidator");
const auth_1 = require("../controllers/auth");
const subcategoriesRoute = (0, express_1.Router)({ mergeParams: true });
subcategoriesRoute.route('/')
    .get(subcategories_1.filterData, subcategories_1.getSubcategories)
    .post(auth_1.protectRoutes, auth_1.checkActive, (0, auth_1.allowedTo)('manager', 'admin'), subcategories_1.setCategoryId, subcategoriesValidator_1.createSubcategoryValidator, subcategories_1.createSubcategory);
subcategoriesRoute.route('/:id')
    .get(subcategoriesValidator_1.getSubcategoryValidator, subcategories_1.getSubcategory)
    .put(auth_1.protectRoutes, auth_1.checkActive, (0, auth_1.allowedTo)('manager', 'admin'), subcategoriesValidator_1.updateSubcategoryValidator, subcategories_1.updateSubcategory)
    .delete(auth_1.protectRoutes, auth_1.checkActive, (0, auth_1.allowedTo)('manager', 'admin'), subcategoriesValidator_1.deleteSubcategoryValidator, subcategories_1.deleteSubcategory);
exports.default = subcategoriesRoute;
