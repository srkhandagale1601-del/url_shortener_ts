import { createUrlService,getUrlService,getUrlByID } from "./url.service";
import {Request,Response} from "express";
import { createUrlSchema } from "../url/url.validation";
import { sendSuccess } from "../../utils/apiResponse";

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
    sendSuccess(res,201,"Short URL created Successfully",result);    
};



export const redirectUrl = async(
    req:Request<UrlParams>,
    res:Response
) =>{
    const { shortCode } = req.params;
    
    const url = await getUrlService(shortCode);

    if(!url){
        return res.status(404).json({
            success:false,
            message:"Url not found"});
    }

    return res.redirect(url.originalUrl);
}


