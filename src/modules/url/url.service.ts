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
export const getUrlByID = async(id:string) =>{
    return await prisma.url.findUnique({
        where:{
            id,
        },
    });
}