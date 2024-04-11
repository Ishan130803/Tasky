"use client";
import React, { ReactNode } from 'react'
import SideNav from '@/app/ui/dashboard/SideNav'
import ProjectForm from '@/app/dashboard/form/projectform'
export default function layout({children}:{children:ReactNode}) {
  const [formOpen,setFormOpen] = React.useState(false);
  const handleForm = ()=>{
    if(formOpen){
      setFormOpen(false);
    }
    else{
      setFormOpen(true);
    }
  }
  return (
    <>
    <div className='relative w-full h-full'>
      
      <div className={'flex relative '}>
        <SideNav projects={project} openForm={handleForm}></SideNav>
        <div>
          {children}
        </div>
      </div>
      {formOpen && <div className='fixed top-0 left-0 w-full h-full bg-black/10 flex justify-center items-center  content-center z-20'>
        <ProjectForm openForm={handleForm}></ProjectForm>
      </div>}  
    </div>
    </>
  )
}


const project = [
  {
    name:'dbmsproj',
    id:'1',
    dueDate:new Date(),
    users:['1','2','3'],
    tasks:['2','4','5']
  }
]