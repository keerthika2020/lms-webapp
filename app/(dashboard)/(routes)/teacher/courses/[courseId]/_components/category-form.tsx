"use client"
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps{
    initialData:Course
    courseId:string;
    options:{label: string; value:string;}[];
};

const formSchema=z.object({
    categoryId:z.string().min(1),
});


export const CategoryForm = ({
    initialData,
    courseId,
    options,

}: CategoryFormProps) =>{
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current)=> !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            categoryId: initialData?.categoryId || "", // Handle null by using an empty string
          },
    });

    const { isSubmitting,isValid} = form.formState;
    const onSubmit = async(values: z.infer<typeof formSchema>)=>{
       try{
        await axios.patch(`/api/courses/${courseId}`,values);
        toast.success("Course updated");
        toggleEdit();
        router.refresh();
        
       }catch{
        toast.error("Something went wrong");
       }
    }

    const selectedOption = options.find((option) => option.value === initialData.categoryId);

    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
           <div className="font-medium flex items-center justify-between">
            Course category
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                    <> Cancel</>
                ):(
               
                    <>
                    <Pencil className="h-4 w-4 mr-2"/>
                    Edit category
                    </>
                )}
                
            </Button>
           </div>
           {!isEditing &&(
            <p className={cn(
                "text-sm mt-2", !initialData.categoryId && " text-slate-500 italic"
            )}> 
                {selectedOption?.label || "No category"}
            </p>
           )}
           {isEditing && (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                    >
                <FormField
                control={form.control}
                name="categoryId"
                render={({field})=>(
                    <FormItem>
                        <FormControl>
                        <Combobox
                         options={options}
                         value={field.value} // Correctly pass value
                         onChange={field.onChange} // Correctly pass onChange
                         />

                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <div className="flex item-center gap-x-2">
                <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    >
                        Save
                    </Button>
                </div>
                </form>
            </Form>
           )}
        </div>
    )
}