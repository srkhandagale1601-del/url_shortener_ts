"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.error.message
            });
        }
        req[source] = result.data;
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map