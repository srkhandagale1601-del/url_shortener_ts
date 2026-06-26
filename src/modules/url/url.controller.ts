import { createUrlService,getUrlService,getUrlByID } from "./url.service";
import {Request,Response} from "express";
import { createUrlSchema } from "../url.validations";

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

export const redirectById = async(
    req:Request<UrlParams>,
    res:Response
)=>{
    const {id} = req.params;
    const url = await getUrlByID(id);
    if(!url){
        return res.status(404).json({message: "Url not found"});
    }

    return res.redirect(url.originalUrl);
}
