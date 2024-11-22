import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search, LayoutList, LayoutGrid, Kanban } from 'lucide-react'

export function ProjectSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search projects"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon">
          <LayoutList className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Kanban className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}