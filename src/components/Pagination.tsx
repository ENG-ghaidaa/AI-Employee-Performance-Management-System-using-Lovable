import React from 'react'

export default function Pagination({page, pages, onChange}:{page:number,pages:number,onChange:(p:number)=>void}){
  return (
    <div className="flex items-center justify-center space-x-3">
      <button onClick={()=>onChange(Math.max(1,page-1))} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
      <div>Page {page} / {pages}</div>
      <button onClick={()=>onChange(Math.min(pages,page+1))} className="px-3 py-1 bg-gray-200 rounded">Next</button>
    </div>
  )
}
