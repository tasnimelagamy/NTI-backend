"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriesRoute_1 = __importDefault(require("./categoriesRoute"));
const subcategoriesRoute_1 = __importDefault(require("./subcategoriesRoute"));
const apiErrors_1 = __importDefault(require("../utils/apiErrors"));
const globalErrors_1 = __importDefault(require("../middlewares/globalErrors"));
const products_1 = __importDefault(require("./products"));
const reviewsRoute_1 = __importDefault(require("./reviewsRoute"));
const couponsRoute_1 = __importDefault(require("./couponsRoute"));
const cartsRoute_1 = __importDefault(require("./cartsRoute"));
const orderRoute_1 = __importDefault(require("./orderRoute"));
const usersRoute_1 = __importDefault(require("./usersRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const wishlistRoute_1 = __importDefault(require("./wishlistRoute"));
const mountRoutes = (app) => {
    app.use('/api/v1/categories', categoriesRoute_1.default);
    app.use('/api/v1/subcategories', subcategoriesRoute_1.default);
    app.use('/api/v1/products', products_1.default);
    app.use('/api/v1/reviews', reviewsRoute_1.default);
    app.use('/api/v1/wishlist', wishlistRoute_1.default);
    app.use('/api/v1/coupons', couponsRoute_1.default);
    app.use('/api/v1/carts', cartsRoute_1.default);
    app.use('/api/v1/orders', orderRoute_1.default);
    app.use('/api/v1/users', usersRoute_1.default);
    app.use('/api/v1/auth', authRoute_1.default);
    app.all('*', (req, res, next) => {
        next(new apiErrors_1.default(`The router ${req.originalUrl} is not found`, 400));
    });
    app.use(globalErrors_1.default);
};
// e-commerce system
// products -> users[admin,manager,user]
// user -> [change password, update information, manager(owner of the system), admin(helper),get my info, change admins password]
// Auth -> [login, signup(users), forget password, check Activation, check role, protect routes]
exports.default = mountRoutes;
