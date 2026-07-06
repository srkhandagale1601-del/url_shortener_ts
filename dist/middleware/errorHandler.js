"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = require("../errors/appError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: err.message || "Internal Error"
        });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map