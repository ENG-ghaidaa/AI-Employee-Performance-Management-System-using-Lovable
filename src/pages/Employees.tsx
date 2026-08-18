import React, { useMemo, useState } from 'react'
import employeesData from '../data/employees.json'
import EmployeeCard from '../components/EmployeeCard'
import SearchBar from '../components/SearchBar'
import EmployeeFilters from '../components/EmployeeFilters'
import Pagination from '../components/Pagination'
import RecommendationCard from '../components/RecommendationCard'

import type { Employee } from '../types'

const PAGE_SIZE = 12

export default function Employees(){
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState<string | null>(null)
  const [skill, setSkill] = useState<string | null>(null)
  const [workload, setWorkload] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const employees: Employee[] = employeesData

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    let list = employees.filter(e => {
      if(department && e.department !== department) return false
      if(workload && e.workloadStatus !== workload) return false
      if(skill && !e.skills.map(s=>s.toLowerCase()).includes(skill.toLowerCase())) return false
      if(!q) return true
      return (
        e.fullName.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.skills.join(' ').toLowerCase().includes(q)
      )
    })

    return list.map(e => ({...e, matchScore: computeMatchScore(e, query, skill)}))
  },[employees, query, department, skill, workload])

  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)

  function onSearch(q:string){ setQuery(q); setPage(1) }
  function onFilterChange(opts:{department?:string|null, skill?:string|null, workload?:string|null}){
    setDepartment(opts.department ?? null)
    setSkill(opts.skill ?? null)
    setWorkload(opts.workload ?? null)
    setPage(1)
  }

  const topRecommendations = [...filtered]
    .sort((a,b)=> (b.matchScore ?? 0) - (a.matchScore ?? 0))
    .slice(0,6)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Employee Directory</h1>
          <p className="text-sm text-gray-600">Browse AI-generated employee profiles and get recommendations.</p>
        </header>

        <div className="grid md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <SearchBar onSearch={onSearch} />
            <EmployeeFilters employees={employees} onChange={onFilterChange} />
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2">Top recommendations</h2>
              <div className="space-y-3">
                {topRecommendations.map(e => (
                  <RecommendationCard key={e.id} employee={e} />
                ))}
              </div>
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paged.map(e => (
                <EmployeeCard key={e.id} employee={e} />
              ))}
            </div>

            <div className="mt-6">
              <Pagination page={page} pages={pages} onChange={setPage} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function computeMatchScore(e: Employee, query:string, skillFilter?:string|null){
  // skill match
  const q = (query || '').toLowerCase()
  let skillMatch = 0
  if(skillFilter){
    skillMatch = e.skills.map(s=>s.toLowerCase()).includes(skillFilter.toLowerCase()) ? 1 : 0
  } else if(q){
    const hits = e.skills.join(' ').toLowerCase().split(q).length - 1
    skillMatch = Math.min(1, hits)
  } else {
    skillMatch = 0
  }

  const experienceNorm = Math.min(e.yearsExperience / 15, 1)
  const workloadFactor = e.workloadStatus === 'Available' ? 1 : e.workloadStatus === 'Normal' ? 0.8 : e.workloadStatus === 'Busy' ? 0.5 : 0.2
  const performance = e.performanceScore / 100

  const score = skillMatch * 0.5 + experienceNorm * 0.2 + workloadFactor * 0.15 + performance * 0.15
  return Math.round(score * 100)
}
