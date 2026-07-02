import { prisma } from "../../lib/prisma";
import { nanoid } from "nanoid";
export const createUrlService = async(
    originalUrl: string,
)=>{
    return prisma.url.create({
        data:{
            originalUrl,
            shortCode:nanoid(6)
        },
    });
};

export const getUrlService = async(
    shortCode:string
) =>{
    return await prisma.url.findUnique({
        where:{
            shortCode,
        }
    });
};

export const getUrlStatsService = async(
    shortCode:string
)=>{
    const url = await prisma.url.findUnique({
        where:{
            shortCode,
        },
        include:{
            _count:{
                select:{
                    click:true,
                },
            },
        },
    });
    if(!url){
        return null;
    }
    return {
        id:url?.id,
        orignalUrl:url?.originalUrl,
        shortCode:url?.shortCode,
        totalClicks:url?._count.click,
        createdAt:url?.createdAt
    }
};
