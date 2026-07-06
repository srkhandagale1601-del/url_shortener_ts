"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlStatsService = exports.getUrlService = exports.createUrlService = void 0;
const appError_1 = require("../../errors/appError");
const prisma_1 = require("../../lib/prisma");
const nanoid_1 = require("nanoid");
const createUrlService = async (originalUrl, shortCode) => {
    if (!shortCode) {
        shortCode = (0, nanoid_1.nanoid)(6);
    }
    else {
        shortCode;
    }
    const existing = await prisma_1.prisma.url.findUnique({
        where: {
            shortCode,
        }
    });
    if (existing) {
        throw new appError_1.AppError("Allready exists", 409);
    }
    return prisma_1.prisma.url.create({
        data: {
            originalUrl,
            shortCode: shortCode.toLowerCase()
        },
    });
};
exports.createUrlService = createUrlService;
const getUrlService = async (shortCode) => {
    return await prisma_1.prisma.url.findUnique({
        where: {
            shortCode,
        }
    });
};
exports.getUrlService = getUrlService;
const getUrlStatsService = async (shortCode) => {
    const url = await prisma_1.prisma.url.findUnique({
        where: {
            shortCode,
        },
        include: {
            _count: {
                select: {
                    click: true,
                },
            },
        },
    });
    if (!url) {
        return null;
    }
    return {
        id: url?.id,
        orignalUrl: url?.originalUrl,
        shortCode: url?.shortCode,
        totalClicks: url?._count.click,
        createdAt: url?.createdAt
    };
};
exports.getUrlStatsService = getUrlStatsService;
//# sourceMappingURL=url.service.js.map