"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategory = exports.updateSubcategory = exports.getSubcategory = exports.getSubcategories = exports.createSubcategory = exports.setCategoryId = exports.filterData = void 0;
const subcategoriesModel_1 = __importDefault(require("../models/subcategoriesModel"));
const refactorHandler_1 = require("./refactorHandler");
const filterData = (req, res, next) => {
    let filterData = {};
    if (req.params.categoryId) {
        filterData.category = req.params.categoryId;
    }
    ;
    req.filterData = filterData;
    next();
};
exports.filterData = filterData;
const setCategoryId = (req, res, next) => {
    if (!req.body.category) {
        req.body.category = req.params.categoryId;
    }
    ;
    next();
};
exports.setCategoryId = setCategoryId;
exports.createSubcategory = (0, refactorHandler_1.createOne)(subcategoriesModel_1.default);
exports.getSubcategories = (0, refactorHandler_1.getAll)(subcategoriesModel_1.default, 'subcategories');
exports.getSubcategory = (0, refactorHandler_1.getOne)(subcategoriesModel_1.default);
exports.updateSubcategory = (0, refactorHandler_1.updateOne)(subcategoriesModel_1.default);
exports.deleteSubcategory = (0, refactorHandler_1.deleteOne)(subcategoriesModel_1.default);
