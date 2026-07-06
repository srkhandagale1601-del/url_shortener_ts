// src/app.ts
import express from "express";

// src/modules/url/url.routes.ts
import { Router } from "express";

// src/errors/appError.ts
var AppError = class _AppError extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, _AppError.prototype);
  }
};

// src/lib/prisma.ts
import "dotenv/config";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Url {\n  id          String   @id @default(uuid())\n  originalUrl String\n  shortCode   String   @unique\n  createdAt   DateTime @default(now())\n  click       Click[]\n}\n\nmodel Click {\n  id        Int      @id @default(autoincrement())\n  urlId     String\n  userAgent String?\n  createdAt DateTime @default(now())\n  url       Url      @relation(fields: [urlId], references: [id])\n\n  @@index([urlId])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Url":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"originalUrl","kind":"scalar","type":"String"},{"name":"shortCode","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"click","kind":"object","type":"Click","relationName":"ClickToUrl"}],"dbName":null},"Click":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"urlId","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"url","kind":"object","type":"Url","relationName":"ClickToUrl"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","url","click","_count","Url.findUnique","Url.findUniqueOrThrow","Url.findFirst","Url.findFirstOrThrow","Url.findMany","data","Url.createOne","Url.createMany","Url.createManyAndReturn","Url.updateOne","Url.updateMany","Url.updateManyAndReturn","create","update","Url.upsertOne","Url.deleteOne","Url.deleteMany","having","_min","_max","Url.groupBy","Url.aggregate","Click.findUnique","Click.findUniqueOrThrow","Click.findFirst","Click.findFirstOrThrow","Click.findMany","Click.createOne","Click.createMany","Click.createManyAndReturn","Click.updateOne","Click.updateMany","Click.updateManyAndReturn","Click.upsertOne","Click.deleteOne","Click.deleteMany","_avg","_sum","Click.groupBy","Click.aggregate","AND","OR","NOT","id","urlId","userAgent","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","originalUrl","shortCode","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "cRQgCAQAAEgAIC4AAEUAMC8AAAkAEDAAAEUAMDEBAAAAATRAAEcAIUABAEYAIUEBAAAAAQEAAAABACAIAwAASwAgLgAASQAwLwAAAwAQMAAASQAwMQIATAAhMgEARgAhMwEASgAhNEAARwAhAgMAAGsAIDMAAE0AIAgDAABLACAuAABJADAvAAADABAwAABJADAxAgAAAAEyAQBGACEzAQBKACE0QABHACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACAIBAAASAAgLgAARQAwLwAACQAQMAAARQAwMQEARgAhNEAARwAhQAEARgAhQQEARgAhAQQAAGoAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAUEAABpACAxAQAAAAE0QAAAAAFAAQAAAAFBAQAAAAEBCwAADgAgBDEBAAAAATRAAAAAAUABAAAAAUEBAAAAAQELAAAQADABCwAAEAAwBQQAAFwAIDEBAFYAITRAAFQAIUABAFYAIUEBAFYAIQIAAAABACALAAATACAEMQEAVgAhNEAAVAAhQAEAVgAhQQEAVgAhAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACADBQAAWQAgGAAAWwAgGQAAWgAgBy4AAEQAMC8AABwAEDAAAEQAMDEBADcAITRAADkAIUABADcAIUEBADcAIQMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAFAwAAWAAgMQIAAAABMgEAAAABMwEAAAABNEAAAAABAQsAACQAIAQxAgAAAAEyAQAAAAEzAQAAAAE0QAAAAAEBCwAAJgAwAQsAACYAMAUDAABXACAxAgBVACEyAQBWACEzAQBTACE0QABUACECAAAABQAgCwAAKQAgBDECAFUAITIBAFYAITMBAFMAITRAAFQAIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgBgUAAE4AIBgAAFEAIBkAAFAAICoAAE8AICsAAFIAIDMAAE0AIAcuAAA1ADAvAAAyABAwAAA1ADAxAgA2ACEyAQA3ACEzAQA4ACE0QAA5ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIAcuAAA1ADAvAAAyABAwAAA1ADAxAgA2ACEyAQA3ACEzAQA4ACE0QAA5ACENBQAAOwAgGAAAOwAgGQAAOwAgKgAAQwAgKwAAOwAgNQIAAAABNgIAAAAENwIAAAAEOAIAAAABOQIAAAABOgIAAAABOwIAAAABPAIAQgAhDgUAADsAIBgAAEEAIBkAAEEAIDUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAEAAIT0BAAAAAT4BAAAAAT8BAAAAAQ4FAAA-ACAYAAA_ACAZAAA_ACA1AQAAAAE2AQAAAAU3AQAAAAU4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQA9ACE9AQAAAAE-AQAAAAE_AQAAAAELBQAAOwAgGAAAPAAgGQAAPAAgNUAAAAABNkAAAAAEN0AAAAAEOEAAAAABOUAAAAABOkAAAAABO0AAAAABPEAAOgAhCwUAADsAIBgAADwAIBkAADwAIDVAAAAAATZAAAAABDdAAAAABDhAAAAAATlAAAAAATpAAAAAATtAAAAAATxAADoAIQg1AgAAAAE2AgAAAAQ3AgAAAAQ4AgAAAAE5AgAAAAE6AgAAAAE7AgAAAAE8AgA7ACEINUAAAAABNkAAAAAEN0AAAAAEOEAAAAABOUAAAAABOkAAAAABO0AAAAABPEAAPAAhDgUAAD4AIBgAAD8AIBkAAD8AIDUBAAAAATYBAAAABTcBAAAABTgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAD0AIT0BAAAAAT4BAAAAAT8BAAAAAQg1AgAAAAE2AgAAAAU3AgAAAAU4AgAAAAE5AgAAAAE6AgAAAAE7AgAAAAE8AgA-ACELNQEAAAABNgEAAAAFNwEAAAAFOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEAPwAhPQEAAAABPgEAAAABPwEAAAABDgUAADsAIBgAAEEAIBkAAEEAIDUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAEAAIT0BAAAAAT4BAAAAAT8BAAAAAQs1AQAAAAE2AQAAAAQ3AQAAAAQ4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQBBACE9AQAAAAE-AQAAAAE_AQAAAAENBQAAOwAgGAAAOwAgGQAAOwAgKgAAQwAgKwAAOwAgNQIAAAABNgIAAAAENwIAAAAEOAIAAAABOQIAAAABOgIAAAABOwIAAAABPAIAQgAhCDUIAAAAATYIAAAABDcIAAAABDgIAAAAATkIAAAAAToIAAAAATsIAAAAATwIAEMAIQcuAABEADAvAAAcABAwAABEADAxAQA3ACE0QAA5ACFAAQA3ACFBAQA3ACEIBAAASAAgLgAARQAwLwAACQAQMAAARQAwMQEARgAhNEAARwAhQAEARgAhQQEARgAhCzUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAEEAIT0BAAAAAT4BAAAAAT8BAAAAAQg1QAAAAAE2QAAAAAQ3QAAAAAQ4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAE8QAA8ACEDQgAAAwAgQwAAAwAgRAAAAwAgCAMAAEsAIC4AAEkAMC8AAAMAEDAAAEkAMDECAEwAITIBAEYAITMBAEoAITRAAEcAIQs1AQAAAAE2AQAAAAU3AQAAAAU4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQA_ACE9AQAAAAE-AQAAAAE_AQAAAAEKBAAASAAgLgAARQAwLwAACQAQMAAARQAwMQEARgAhNEAARwAhQAEARgAhQQEARgAhRQAACQAgRgAACQAgCDUCAAAAATYCAAAABDcCAAAABDgCAAAAATkCAAAAAToCAAAAATsCAAAAATwCADsAIQAAAAAAAAFKAQAAAAEBSkAAAAABBUoCAAAAAVACAAAAAVECAAAAAVICAAAAAVMCAAAAAQFKAQAAAAEFEgAAbQAgEwAAcAAgRwAAbgAgSAAAbwAgTQAAAQAgAxIAAG0AIEcAAG4AIE0AAAEAIAAAAAsSAABdADATAABiADBHAABeADBIAABfADBJAABgACBKAABhADBLAABhADBMAABhADBNAABhADBOAABjADBPAABkADADMQIAAAABMwEAAAABNEAAAAABAgAAAAUAIBIAAGgAIAMAAAAFACASAABoACATAABnACABCwAAbAAwCAMAAEsAIC4AAEkAMC8AAAMAEDAAAEkAMDECAAAAATIBAEYAITMBAEoAITRAAEcAIQIAAAAFACALAABnACACAAAAZQAgCwAAZgAgBy4AAGQAMC8AAGUAEDAAAGQAMDECAEwAITIBAEYAITMBAEoAITRAAEcAIQcuAABkADAvAABlABAwAABkADAxAgBMACEyAQBGACEzAQBKACE0QABHACEDMQIAVQAhMwEAUwAhNEAAVAAhAzECAFUAITMBAFMAITRAAFQAIQMxAgAAAAEzAQAAAAE0QAAAAAEEEgAAXQAwRwAAXgAwSQAAYAAgTQAAYQAwAAEEAABqACADMQIAAAABMwEAAAABNEAAAAABBDEBAAAAATRAAAAAAUABAAAAAUEBAAAAAQIAAAABACASAABtACADAAAACQAgEgAAbQAgEwAAcQAgBgAAAAkAIAsAAHEAIDEBAFYAITRAAFQAIUABAFYAIUEBAFYAIQQxAQBWACE0QABUACFAAQBWACFBAQBWACECBAYCBQADAQMAAQEEBwAAAAADBQAIGAAJGQAKAAAAAwUACBgACRkACgEDAAEBAwABBQUADxgAEhkAEyoAECsAEQAAAAAABQUADxgAEhkAEyoAECsAEQYCAQcIAQgLAQkMAQoNAQwPAQ0RBA4SBQ8UARAWBBEXBhQYARUZARYaBBodBxseCxwfAh0gAh4hAh8iAiAjAiElAiInBCMoDCQqAiUsBCYtDScuAigvAikwBCwzDi00FA"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
var adapter = new PrismaPg(pool);
var prisma = new PrismaClient({
  adapter
});

// src/modules/url/url.service.ts
import { nanoid } from "nanoid";
var createUrlService = async (originalUrl, shortCode) => {
  if (!shortCode) {
    shortCode = nanoid(6);
  } else {
    shortCode;
  }
  const existing = await prisma.url.findUnique({
    where: {
      shortCode
    }
  });
  if (existing) {
    throw new AppError("Allready exists", 409);
  }
  return prisma.url.create({
    data: {
      originalUrl,
      shortCode: shortCode.toLowerCase()
    }
  });
};
var getUrlService = async (shortCode) => {
  return await prisma.url.findUnique({
    where: {
      shortCode
    }
  });
};
var getUrlStatsService = async (shortCode) => {
  const url = await prisma.url.findUnique({
    where: {
      shortCode
    },
    include: {
      _count: {
        select: {
          click: true
        }
      }
    }
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

// src/modules/url/url.validation.ts
import { z } from "zod";
var createUrlSchema = z.object({
  originalUrl: z.url(),
  shortCode: z.string().min(6).optional()
});
var shortCodeSchema = z.object({
  shortCode: z.string().min(6).max(10)
});

// src/utils/apiResponse.ts
var sendSuccess = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

// src/modules/url/url.controller.ts
var createUrl = async (req, res) => {
  const validatedResult = createUrlSchema.safeParse(req.body);
  if (!validatedResult.success) {
    throw new AppError(validatedResult.error.message, 400);
  }
  const { originalUrl } = validatedResult.data;
  const shortCode = validatedResult.data.shortCode ?? "";
  const result = await createUrlService(originalUrl, shortCode);
  sendSuccess(res, 201, "Short URL created Successfully", result);
};
var redirectUrl = async (req, res) => {
  const { shortCode } = req.params;
  const url = await getUrlService(shortCode);
  if (url) {
    const userAgent = req.headers["user-agent"] ?? null;
    await prisma.click.create({
      data: {
        urlId: url.id,
        userAgent
      }
    });
  } else {
    throw new AppError("Url Not Found", 404);
  }
  return res.redirect(url.originalUrl);
};
var getUrlStats = async (req, res) => {
  const { shortCode } = req.params;
  const stat = await getUrlStatsService(shortCode);
  if (!stat) {
    throw new AppError("Shortcode not found", 404);
  }
  sendSuccess(res, 200, "Url stats fetched successfully", stat);
};

// src/middleware/validate.ts
var validate = (schema, source = "body") => {
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

// src/middleware/asyncHandler.ts
var asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// src/modules/url/url.routes.ts
var router = Router();
router.post("/", validate(createUrlSchema), asyncHandler(createUrl));
router.get("/:shortCode", validate(shortCodeSchema, "params"), asyncHandler(redirectUrl));
router.get("/:shortCode/stats", validate(shortCodeSchema, "params"), asyncHandler(getUrlStats));
var url_routes_default = router;

// src/modules/health/health.routes.ts
import { Router as Router2 } from "express";

// src/modules/health/health.service.ts
var getHealthService = async () => {
  const isHealthy = true;
  if (isHealthy) {
    return {
      status: "UP",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: process.uptime()
    };
  }
};

// src/modules/health/health.controller.ts
var getHealth = async (req, res) => {
  try {
    const health = await getHealthService();
    res.status(200).json(health);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(503).json({
      status: "DOWN",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: process.uptime(),
      error: errorMessage
    });
  }
};

// src/modules/health/health.routes.ts
var router2 = Router2();
router2.get("/", getHealth);
var health_routes_default = router2;

// src/middleware/errorHandler.ts
var errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  } else {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Error"
    });
  }
};

// src/middleware/logger.ts
var logger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
};

// src/middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";
var rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  limit: 100,
  message: {
    success: false,
    err: "Request Limit exceeded",
    message: "Too many requests. Please try again after 15 minutes."
  }
});

// src/app.ts
var app = express();
app.use(express.json());
app.use(logger);
app.use(rateLimiter);
app.use("/urls", url_routes_default);
app.use("/health", health_routes_default);
app.use(errorHandler);
var app_default = app;

// src/config/env.ts
import dotenv from "dotenv";
dotenv.config();
var config2 = {
  PORT: Number(process.env.PORT) || 3e3,
  DATABASE_URL: process.env.DATABASE_URL
};

// src/server.ts
var PORT = config2.PORT;
app_default.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
