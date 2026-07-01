import { createUrlService,getUrlService,getUrlByID } from "./url.service";
import {Request,Response} from "express";
import { createUrlSchema } from "../url/url.validation";
import { sendSuccess } from "../../utils/apiResponse";
import { AppError } from "../../errors/appError";

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
        throw new AppError(validatedResult.error.message,400);
    }
    const { originalUrl } = validatedResult.data;
    const result = await createUrlService(originalUrl);
    sendSuccess(res,201,"Short URL created Successfully",result);    
};



export const redirectUrl = async(
    req:Request<UrlParams>,
    res:Response
) =>{
    const { shortCode } = req.params;
    
    const url = await getUrlService(shortCode);

    if(!url){
        throw new AppError("Url Not Found",404);
    }

    return res.redirect(url.originalUrl);
}


