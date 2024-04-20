"use client";
import React, { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LucideFolders, PlusCircle } from "lucide-react";
import { ProfileAvatar } from "../ProfileAvatar";
import ProjectForm from "@/app/dashboard/form/projectform";
import { useProjectList } from "@/context/ProjectListContext";

type Props = {
  title:string;
};

export default function Header({title}:Props) {
  const router = useRouter();
  const url = usePathname();
  const [formOpen,setFormOpen] = useState<boolean>(false);
  const handleForm = () => {
    if (formOpen) {
      setFormOpen(false);
    } else {
      setFormOpen(true);
    }
  };
  const projectList = useProjectList();
  // @ts-ignore
  const handleProjects = (data: Project) => {
    projectList.setProjects([...projectList.projects, data]);
  };
  return (
    <>
      <div className="p-3 w-full flex justify-between content-center">
        <div className="h-full p-2 ">
          <div className="flex gap-2 content-end">
            <LucideFolders className="inline" />
            <span className="inline-block">{title}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>{setFormOpen(true)}} className="p-1 flex gap-2 content-center bg-blue-400/85  rounded-md text-white font-semibold hover:shadow-md hover:bg-blue-400">
            <PlusCircle className="inline w-5 h-5 mt-1" />
            <span className="block mt-1">New</span>
            
          </button>
          <ProfileAvatar className="z-10 hover:cursor-pointer rounded-full" />
        </div>
      </div>
      <hr className="border-gray-300" />
      {formOpen && (
        <div className="fixed top-0 left-0  w-full h-full bg-black/10 flex justify-center items-center  content-center z-20">
          <ProjectForm
            openForm={handleForm}
            createProjects={handleProjects}
          ></ProjectForm>
        </div>
      )}
      
    </>
  );
}
