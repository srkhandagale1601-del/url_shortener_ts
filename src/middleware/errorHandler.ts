import { Request,Response,NextFunction } from "express";
import { AppError } from "../errors/appError";

export const errorHandler = (
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction,
)=>{
    console.log(err);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }else{
        res.status(500).json({
        success : false,
        message: err.message || "Internal Error"
        });
    }
    
}