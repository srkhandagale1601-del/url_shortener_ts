import {z} from "zod";
import { Request,Response,NextFunction } from "express";

export const validate = (schema: z.ZodObject<any>,source: "body" | "params" | "query" = "body") =>{
return (req:Request,res:Response,next:NextFunction)=>{
    const result = schema.safeParse(req[source]);
    console.log("source:", source);
    console.log("body:", req.body);
    console.log("params:", req.params);
    console.log("query:", req.query);

    if(!result.success){
        return res.status(404).json(result.error.format());
    }

    req[source]= result.data;
    next();
  }
};
