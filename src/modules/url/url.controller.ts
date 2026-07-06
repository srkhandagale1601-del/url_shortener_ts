import { createUrlService,getUrlService,getUrlStatsService } from "./url.service";
import {Request,Response} from "express";
import { createUrlSchema } from "../url/url.validation";
import { sendSuccess } from "../../utils/apiResponse";
import { AppError } from "../../errors/appError";
import { prisma } from "../../lib/prisma";

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
    const { originalUrl, shortCode } = validatedResult.data;
    const result = await createUrlService(originalUrl, shortCode ?? "");
    sendSuccess(res,201,"Short URL created Successfully",result);    
};



export const redirectUrl = async(
    req:Request<UrlParams>,
    res:Response
) =>{
    const { shortCode } = req.params;
    
    const url = await getUrlService(shortCode);
    if(url){
        const userAgent = req.headers["user-agent"] ?? null;
        await prisma.click.create({
        data:{
            urlId: url.id,
            userAgent,
        }
    })
        
    }else{
        throw new AppError("Url Not Found",404);
    }
    return res.redirect(url.originalUrl);
}

export const getUrlStats = async (
    req: Request<UrlParams>,
    res: Response
) => {
    const { shortCode } = req.params;

    const stat = await getUrlStatsService(shortCode);

    if (!stat) {
        throw new AppError("Shortcode not found", 404);
    }
    sendSuccess(res, 200, "Url stats fetched successfully", stat);
};
