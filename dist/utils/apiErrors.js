"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiErrors extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4') ? 'failed' : 'error';
    }
    ;
}
exports.default = ApiErrors;
