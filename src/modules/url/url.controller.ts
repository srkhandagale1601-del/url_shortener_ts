import { createUrlService,getUrlService,getUrlByID } from "./url.service";
import {Request,Response} from "express";
import { createUrlSchema,shortCodeSchema } from "./url.validation";

type UrlParams = {
    shortCode:string
    id:string
}

export const createUrl = async(
    req:Request,
    res:Response
    
)=>{
    const validatedResult = createUrlSchema.safeParse(req.body);
    if(!validatedResult.success){
        return res.status(400).json({error:validatedResult.error.issues});
    }
    const { originalUrl } = validatedResult.data;
    const result = await createUrlService(originalUrl);
    res.json(result);
    
};



export const redirectUrl = async(
    req:Request<UrlParams>,
    res:Response
) =>{
    const { shortCode } = req.params;

    const url = await getUrlService(shortCode);

    if(!url){
        return res.status(404).json({message:"Url not found"});
    }
    return res.redirect(url.originalUrl);
}


