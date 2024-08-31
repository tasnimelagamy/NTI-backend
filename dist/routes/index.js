"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriesRoute_1 = __importDefault(require("./categoriesRoute"));
const subcategoriesRoute_1 = __importDefault(require("./subcategoriesRoute"));
const apiErrors_1 = __importDefault(require("../utils/apiErrors"));
const globalErrors_1 = __importDefault(require("../middlewares/globalErrors"));
const mountRoutes = (app) => {
    app.use('/api/v1/categories', categoriesRoute_1.default);
    app.use('/api/v1/subcategories', subcategoriesRoute_1.default);
    app.all('*', (req, res, next) => {
        next(new apiErrors_1.default(`the router ${req.originalUrl}`, 400));
    });
    app.use(globalErrors_1.default);
};
exports.default = mountRoutes;
