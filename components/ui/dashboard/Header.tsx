"use client";
import React, { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LucideFolders, PlusCircle } from "lucide-react";
import { ProfileAvatar } from "../ProfileAvatar";
type Props = {
  title:string;
};

export default function Header({title}:Props) {
  const router = useRouter();
  const url = usePathname();

  return (
    <>
      <div className="p-[10px] w-full bg-white flex justify-between content-center">
        <div className="p-2">
          <div className="flex h-full content-center gap-2">
            <LucideFolders className="block"></LucideFolders>
            <div className="flex content-end "><span className="block  h-7">{title}</span></div>
          </div>
        </div>
        <div className="flex gap-2 ">
          <button className="p-1 flex gap-2 content-end bg-blue-400/85 rounded-md text-white font-semibold hover:bg-blue-400">
            <div><PlusCircle className="inline" /></div>
            <span className="block">New</span>
          </button>
          <ProfileAvatar className="z-0 hover:cursor-pointer rounded-full" />

        </div>
      </div>
      <hr className="border-gray-300" />
      
      
    </>
  );
}
