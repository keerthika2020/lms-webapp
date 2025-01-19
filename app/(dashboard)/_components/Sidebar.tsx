"use client";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
// in the 1st div classname width was originaly kept w-56 i changed it to full
export const Sidebar = () => {
  return (
    <div className="h-full w-56 border-r flex flex-col overflow-y-auto  bg-white shadow-sm">
      <div className="p-6"> 
        
        <Logo/>

      </div>
    <div className="flex flex-col w-full">
        <SidebarRoutes/>
    </div>
    </div>
  );
};
