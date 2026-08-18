import React from 'react'
import type { EmployeeWithScore } from '../types'

export default function RecommendationCard({employee}:{employee:EmployeeWithScore}){
  return (
    <div className="bg-white p-2 rounded shadow-sm">
      <div className="flex items-center">
        <img src={employee.avatar} className="w-8 h-8 rounded-full" />
        <div className="ml-2 text-sm">
          <div className="font-medium">{employee.fullName}</div>
          <div className="text-xs text-gray-500">{employee.title}</div>
        </div>
        <div className="ml-auto text-sm font-semibold">{employee.matchScore ?? 0}%</div>
      </div>
    </div>
  )
}
