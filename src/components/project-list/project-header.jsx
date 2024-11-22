import React from 'react'
import { Button } from '../ui/button'
import { ProjectSearch } from './project-search'
import { LayoutGrid, List, Kanban } from 'lucide-react'

export function ProjectHeader({ searchTerm, onSearchChange, onViewChange }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <ProjectSearch value={searchTerm} onChange={onSearchChange} />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => onViewChange('list')}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onViewChange('board')}>
            <Kanban className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onViewChange('grid')}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + Add new project
        </Button>
      </div>
    </div>
  )
}