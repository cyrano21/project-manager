import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Search, LayoutList, LayoutGrid, Kanban } from 'lucide-react'

export function ProjectHeader({ 
  projectCount, 
  searchTerm, 
  onSearchChange, 
  onAddProject 
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Projects ({projectCount})</h1>
      </div>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white"
        onClick={onAddProject}
      >
        + Add new project
      </Button>
    </div>
  )
}