"use client";
import React, { ReactNode, useState } from "react";
import SideNav from "@/components/ui/dashboard/SideNav";
import ProjectForm from "@/app/dashboard/form/projectform";
import { LucideFolders, PlusCircle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@mui/joy";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import SessionProviderWrapper from "@/components/ui/wrappers/SessionProviderWrapper";

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
      <SessionProviderWrapper>
        <div className="relative w-full h-full">
          <div className={"flex relative w-full h-full "}>
            <SideNav
              projects={project}
              openForm={handleForm}
              handleSelected={handleSelected}
            ></SideNav>
            <div className="w-[100%] h-full max-w-full  min-w-[70%]">
              <div className="p-3 w-full flex justify-between content-center">
                <div className="h-full p-2 ">
                  <div className="flex gap-2 content-end">
                    <LucideFolders className="inline" />
                    <span className="inline-block">{selected}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex gap-2 items-center p-4 bg-blue-400/85 rounded-md text-white font-semibold hover:bg-blue-400">
                    <PlusCircle className="inline" />
                    <span className="block">New</span>
                  </button>
                  <ProfileAvatar className="z-10 hover:cursor-pointer rounded-full" />
                </div>
              </div>
              <hr className="border-gray-300" />
              <div className="w-full overflow-hidden">{children}</div>
            </div>
          </div>
          {formOpen && (
            <div className="fixed top-0 left-0  w-full h-full bg-black/10 flex justify-center items-center  content-center z-20">
              <ProjectForm openForm={handleForm}></ProjectForm>
            </div>
          )}
        </div>
      </SessionProviderWrapper>
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
