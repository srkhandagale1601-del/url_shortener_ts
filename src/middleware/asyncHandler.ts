import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { ParsedQs } from "qs";

export const asyncHandler = <
  P = Record<string, any>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
>(
  fn: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};