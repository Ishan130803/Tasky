"use client";
import React from "react";


const Page = (props:any) => {
  return (
    <>
      <div className=" p-2 bg-gray-100 grid grid-cols-3 gap-4">
				<div className="p-4 bg-white flex justify-between border-gray-200 border rounded-md text-xl">
          <p className="p-2">Total Tasks</p>
          <div className="rounded-full p-2 text-center w-11 h-11 border border-gray-200">
            23
          </div>

        </div>
				<div className="p-4 bg-white flex justify-between border-gray-200 border rounded-md text-xl">
          <p className="p-2">Completed tasks</p>
          <div className="rounded-full p-2 text-center w-11 h-11 border border-gray-200">
            5
          </div>
        </div>
				<div className="p-4 bg-white flex justify-between border-gray-200 border rounded-md text-xl">
          <p className="p-2">Overdue</p>
          <div className="rounded-full p-2 text-center w-11 h-11 border border-gray-200">
            9
          </div>
        </div>
        

			</div>
    </>
  );
};

export default Page;

