"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  dueDate: Date;
}

export default function ProjectForm({
  openForm,
}: {
  openForm: React.EventHandler<React.MouseEvent<HTMLElement>>;
}) {
  const { register, handleSubmit,setError,formState:{errors}} = useForm<IFormInput>({
    defaultValues:{
      name:'',
      
    }
  });
  const onSubmit = (data: IFormInput)=>{
    console.log(data);
  }
  return (
    <>
      <div className="w-[550px] border-[1px] relative bg-white  rounded-md border-gray-200 p-7">
        
          <button onClick={openForm} className="w-5 h-5 absolute right-4 top-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
     
        <h2 className="text-lg font-semibold">Create New Project</h2>
        <form className=" mt-4 w-[80%]  p-4 " onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-base font-medium">
              Project Name
            </label>
            <input
              className="border-[1px] p-1 rounded-sm my-2 outline-transparent outline focus:border-blue-700 block border-slate-300"
              type="text"
              {...register("name", { required: true, minLength:{value:5,message:"Project name is too short"},validate:(value)=> value.trim().length>0||'Project Name cannot be empty' })}
              name="name"
              aria-invalid={errors.name?"true":"false"}
            />
            {
              errors.name?.type==='required' && (<p role="alert" className="text-red-600 text-xs">Project name is required</p>) ||
              errors.name?.type==='minLength' && (<p role="alert" className="text-red-600 text-xs">Project name is too short</p>)
              
            }
          </div>
          <div className="">
            <label htmlFor="date " className="block my-2 text-base font-medium">
              Project Due Date
            </label>
            <input
              type="Date"
              className="block my-2 border-[1px] border-gray-300 rounded-sm p-1 focus:border-blue-700 outline-transparent outline"
              
              {...register("dueDate")}
            />
          </div>
          <input type="submit" className="bg-blue-800 cursor-pointer p-2 rounded-md text-white hover:bg-blue-700/85"/>
          
        </form>
      </div>
    </>
  );
}
