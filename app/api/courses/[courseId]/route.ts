import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function PATCH(req:Request,
    { params }:{ params:{ courseId: string }}  //the courseId is same as the folder name
){
    try{
        const {userId}= await auth();
        const {courseId} = params;
        const values = await req.json();
        const { imageUrl } = await req.json(); 
        if(!userId){
            return new NextResponse("Unauthorized ", {status:401});
        }

        const course = await db.course.update({
           where:{
            id: courseId,
            userId
           },
           data:{
            ...values,
            imageUrl,
           }
        });
        return NextResponse.json(course);
    }catch(error){
        console.log("[COURSE_ID]", error)
        return new NextResponse("Internal Error", {status:500});
    }
    
}