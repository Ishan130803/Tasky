"use client";
import React, { ReactNode, useState } from "react";
import SideNav from "@/components/ui/dashboard/SideNav";
import ProjectForm from "@/app/dashboard/form/projectform";
import { LucideFolders, PlusCircle } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Layout({ children }: { children: ReactNode }) {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("My Actions");
  const handleForm = () => {
    if (formOpen) {
      setFormOpen(false);
    } else {
      setFormOpen(true);
    }
  };

  const handleSelected = (value: string) => {
    setSelected(value);
  };
  return (
    <>
      <div className="relative w-full h-full">
        <div className={"flex relative w-full h-full "}>
          <SideNav
            projects={project}
            openForm={handleForm}
            handleSelected={handleSelected}
          ></SideNav>
          <div className="w-[100%] h-full max-w-full  min-w-[70%]">
            
            <div className="w-full overflow-hidden">{children}</div>
          </div>
        </div>
        {formOpen && (
          <div className="fixed top-0 left-0  w-full h-full bg-black/10 flex justify-center items-center  content-center z-20">
            <ProjectForm openForm={handleForm}></ProjectForm>
          </div>
        )}
      </div>
    </>
  );
}

const project = [
  {
    name: "dbmsproj",
    id: "1",
    dueDate: new Date(),
    users: ["1", "2", "3"],
    tasks: ["2", "4", "5"],
  },
];

const options = ["My Actions"];
