import React from 'react'
import type { EmployeeWithScore } from '../types'

export default function EmployeeCard({employee}:{employee: EmployeeWithScore}){
  return (
    <article className="bg-white p-4 rounded shadow-sm">
      <div className="flex items-center space-x-3">
        <img src={employee.avatar} alt={employee.fullName} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h3 className="font-medium">{employee.fullName}</h3>
          <p className="text-sm text-gray-600">{employee.title} — {employee.department}</p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-sm font-semibold">{employee.performanceScore}%</div>
          <div className="text-xs text-gray-500">Performance</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm text-gray-700">Skills: {employee.skills.join(', ')}</div>
        <div className="text-sm text-gray-500 mt-1">Experience: {employee.yearsExperience} yrs • Workload: <span className={`font-semibold ${badgeColor(employee.workloadStatus)}`}>{employee.workloadStatus}</span></div>
      </div>

      {typeof employee.matchScore === 'number' && (
        <div className="mt-3 text-sm">
          <span className="font-semibold">Match: </span>{employee.matchScore}%
        </div>
      )}
    </article>
  )
}

function badgeColor(status:string){
  switch(status){
    case 'Available': return 'text-green-600'
    case 'Normal': return 'text-blue-600'
    case 'Busy': return 'text-yellow-600'
    case 'Overloaded': return 'text-red-600'
    default: return 'text-gray-600'
  }
}
