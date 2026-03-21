'use server'
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";


export const fetchCollections = async (name:string) => {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return { status:400 , errror:"Unauthorized: user not authenticated"};
        }
        const collections = await prisma.collections.findMany({
            where: {
                userId: session.user.id,
                name
            }
        })

        if(!collections){
            return { status:404 , error:"No collections found for this user"};
        }
        return { status:200 , data:collections};
    } catch (error) {
        console.log(error)
    }
}