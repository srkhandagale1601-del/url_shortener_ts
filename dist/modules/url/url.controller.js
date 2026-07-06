"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlStats = exports.redirectUrl = exports.createUrl = void 0;
const url_service_1 = require("./url.service");
const url_validation_1 = require("../url/url.validation");
const apiResponse_1 = require("../../utils/apiResponse");
const appError_1 = require("../../errors/appError");
const prisma_1 = require("../../lib/prisma");
const createUrl = async (req, res) => {
    const validatedResult = url_validation_1.createUrlSchema.safeParse(req.body);
    if (!validatedResult.success) {
        throw new appError_1.AppError(validatedResult.error.message, 400);
    }
    const { originalUrl } = validatedResult.data;
    const shortCode = validatedResult.data.shortCode ?? "";
    const result = await (0, url_service_1.createUrlService)(originalUrl, shortCode);
    (0, apiResponse_1.sendSuccess)(res, 201, "Short URL created Successfully", result);
};
exports.createUrl = createUrl;
const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;
    const url = await (0, url_service_1.getUrlService)(shortCode);
    if (url) {
        const userAgent = req.headers["user-agent"] ?? null;
        await prisma_1.prisma.click.create({
            data: {
                urlId: url.id,
                userAgent,
            }
        });
    }
    else {
        throw new appError_1.AppError("Url Not Found", 404);
    }
    return res.redirect(url.originalUrl);
};
exports.redirectUrl = redirectUrl;
const getUrlStats = async (req, res) => {
    const { shortCode } = req.params;
    const stat = await (0, url_service_1.getUrlStatsService)(shortCode);
    if (!stat) {
        throw new appError_1.AppError("Shortcode not found", 404);
    }
    (0, apiResponse_1.sendSuccess)(res, 200, "Url stats fetched successfully", stat);
};
exports.getUrlStats = getUrlStats;
//# sourceMappingURL=url.controller.js.map