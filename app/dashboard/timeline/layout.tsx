import React, { ReactNode } from 'react'

export default function layout({children}:{children:ReactNode}) {
  return (
    <div className='bg-blue-200 h-full w-full border p-2'>
      <div className="bg-blue-200 h-full w-full rounded-3xl outline-dashed outline-blue-700 outline-4">{children}</div>
    </div>
      
  )
}
