export type Employee = {
  id: number
  employeeId: string
  fullName: string
  firstName: string
  lastName: string
  department: string
  title: string
  skills: string[]
  yearsExperience: number
  taskCompletionRate: number
  workloadStatus: string
  performanceScore: number
  bio?: string
  avatar?: string
}

export type EmployeeWithScore = Employee & { matchScore?: number }
