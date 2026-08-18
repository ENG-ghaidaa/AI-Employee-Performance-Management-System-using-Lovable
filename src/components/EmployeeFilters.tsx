import React, { useMemo, useState } from 'react'
import type { Employee } from '../types'

export default function EmployeeFilters({employees, onChange}:{employees:Employee[], onChange:(opts:{department?:string|null, skill?:string|null, workload?:string|null})=>void}){
  const departments = useMemo(()=>Array.from(new Set(employees.map(e=>e.department))).sort(),[employees])
  const skills = useMemo(()=>{
    const s = new Set<string>()
    employees.forEach(e=>e.skills.forEach(k=>s.add(k)))
    return Array.from(s).sort()
  },[employees])
  const workloads = ['Available','Normal','Busy','Overloaded']

  const [dept, setDept] = useState<string | null>(null)
  const [skill, setSkill] = useState<string | null>(null)
  const [workload, setWorkload] = useState<string | null>(null)

  function apply(){ onChange({department:dept, skill, workload}) }
  function reset(){ setDept(null); setSkill(null); setWorkload(null); onChange({department:null, skill:null, workload:null}) }

  return (
    <div className="mt-4 bg-white p-3 rounded shadow-sm">
      <h3 className="font-medium mb-2">Filters</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm block">Department</label>
          <select value={dept ?? ''} onChange={e=>setDept(e.target.value || null)} className="w-full border rounded p-2">
            <option value="">Any</option>
            {departments.map(d=> <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm block">Skill</label>
          <select value={skill ?? ''} onChange={e=>setSkill(e.target.value || null)} className="w-full border rounded p-2">
            <option value="">Any</option>
            {skills.map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm block">Workload</label>
          <select value={workload ?? ''} onChange={e=>setWorkload(e.target.value || null)} className="w-full border rounded p-2">
            <option value="">Any</option>
            {workloads.map(w=> <option key={w} value={w}>{w}</option>)}
          </select>
        </div>

        <div className="flex items-center">
          <button onClick={apply} className="px-3 py-1 bg-blue-600 text-white rounded">Apply</button>
          <button onClick={reset} className="ml-2 px-3 py-1 bg-gray-200 rounded">Reset</button>
        </div>
      </div>
    </div>
  )
}
