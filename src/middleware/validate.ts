import {success, z} from "zod";
import { Request,Response,NextFunction } from "express";

export const validate = (schema: z.ZodObject<any>,source: "body" | "params" | "query" = "body") =>{
return (req:Request,res:Response,next:NextFunction)=>{
    const result = schema.safeParse(req[source]);
    if(!result.success){
        return res.status(400).json({
          success :false,
          message:result.error.message
        });
    }

    req[source]= result.data;
    next();
  }
};
