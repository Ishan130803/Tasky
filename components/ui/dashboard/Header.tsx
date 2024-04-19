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
      <div className="p-3 w-full flex justify-between content-center">
        <div className="h-full p-2 ">
          <div className="flex gap-2 content-end">
            <LucideFolders className="inline" />
            <span className="inline-block">{title}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-1 flex gap-2 content-center bg-blue-400/85 rounded-md text-white font-semibold hover:bg-blue-400">
            <PlusCircle className="inline" />
            <span className="block">New</span>
          </button>
          <ProfileAvatar className="z-10 hover:cursor-pointer rounded-full" />
        </div>
      </div>
      <hr className="border-gray-300" />
      
      
    </>
  );
}
