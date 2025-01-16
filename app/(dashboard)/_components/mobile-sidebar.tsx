"use client";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar"; // here _compnent is not needed 
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet";
  
export const MobileSidebar =() =>{
    return(
       
            <Sheet>
                <SheetTrigger className="md:hidden pr-2  hover:opacity-75 transition">
                <Menu/>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-56 bg-white">
                   
                    <Sidebar />
                </SheetContent>
            </Sheet>
           
        
    )
}