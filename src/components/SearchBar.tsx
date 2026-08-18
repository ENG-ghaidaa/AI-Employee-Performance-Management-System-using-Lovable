import React, { useState } from 'react'

export default function SearchBar({onSearch}:{onSearch:(q:string)=>void}){
  const [q, setQ] = useState('')
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Search</label>
      <div className="mt-1">
        <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') onSearch(q) }} type="search" className="w-full border rounded p-2" placeholder="Name, title or skill" />
      </div>
      <div className="mt-2">
        <button onClick={()=>onSearch(q)} className="px-3 py-1 bg-blue-600 text-white rounded">Search</button>
        <button onClick={()=>{ setQ(''); onSearch('') }} className="ml-2 px-3 py-1 bg-gray-200 rounded">Clear</button>
      </div>
    </div>
  )
}
