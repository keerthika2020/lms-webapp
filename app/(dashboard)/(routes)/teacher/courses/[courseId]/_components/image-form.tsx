"use client"
import * as z from "zod";
import axios from "axios";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";

import toast from "react-hot-toast";

import { Course } from "@prisma/client";
import Image from "next/image";
//import { FileUpload } from "@/components/file-upload";
import FileUpload from "@/components/file-upload";

interface ImageFormProps{
    initialData:Course
    courseId:string;
};

const formSchema=z.object({
    imageUrl: z.string().min(1,{
        message:"Image is required",
    }),
});


export const ImageForm = ({
    initialData,
    courseId
}: ImageFormProps) =>{
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current)=> !current);

    const router = useRouter();

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver:zodResolver(formSchema),
    //     defaultValues:{
    //         imageUrl: initialData?.imageUrl || "", // Handle null by using an empty string
    //       },
    // });

    // const { isSubmitting,isValid} = form.formState;
    
    const onSubmit = async (values: { imageUrl: string }) => {
        try {
          // Here you are sending the URL to the PATCH endpoint
          await axios.patch(`/api/courses/${courseId}`, values);
          toast.success("Course updated");
          toggleEdit();
          router.refresh();
        } catch (error) {
          toast.error("Something went wrong");
          console.error(error);
        }
      };
    // const onSubmit = async (values: { imageUrl: string }) => {
    //     try {
    //       await fetch(`/api/courses/${courseId}`, {
    //         method: "PATCH",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(values),
    //       });
    //       toast.success("Course image updated");
    //       toggleEdit();
    //       router.refresh();
    //     } catch (error) {
    //       toast.error("Something went wrong");
    //       console.error(error);
    //     }
    //   };
    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
           <div className="font-medium flex items-center justify-between">
            Course image
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing && (
                    <> Cancel</>
                )}
                {!isEditing && !initialData.imageUrl &&(
               
               <>
               <PlusCircle className="h-4 w-4 mr-2"/>
               Add an image
               </>
           )}

                {!isEditing && initialData.imageUrl && (
               
                    <>
                    <Pencil className="h-4 w-4 mr-2"/>
                    Edit image
                    </>
                )}
                
            </Button>
           </div>
           {!isEditing &&(
            !initialData.imageUrl ? (
                <div className="flex items-center justify-center h-60 
                bg-slate-200 rounded-md">
                    <ImageIcon className="h-10 w-10 text-slate-500"  />

                </div>
            ):(
                <div className="relative aspect-video mt-2">
                    <Image
                    alt="Upload"
                    fill
                    className="object-cover rounded-md"
                    src={initialData.imageUrl}
                    />
                    
                </div>    
            )
           )}
           {isEditing && (
            <div>
                 <FileUpload
            endpoint="courseImage"
            onChange={(url?: string) => {
              if (url) {
                console.log("Uploaded image URL:", url);
                onSubmit({ imageUrl: url }); // Pass the image URL to the PATCH request
              }
            }}
          />

                <div className="text-xs text-muted-foreground mt-4">
                    16:9 aspect ratio  recommended
                </div>
            </div>
           )}
        </div>
    )
}