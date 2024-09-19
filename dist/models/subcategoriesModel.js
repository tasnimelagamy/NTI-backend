"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subcategoriesSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, required: true }
}, { timestamps: true });
subcategoriesSchema.pre(/^find/, function (next) {
    this.populate({ path: 'category', select: 'name' });
    next();
});
exports.default = (0, mongoose_1.model)('subcategories', subcategoriesSchema);
