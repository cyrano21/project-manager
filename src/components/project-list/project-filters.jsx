import React from 'react'
import { Button } from '../ui/button'

export function ProjectFilters({ currentFilter, onFilterChange, filters }) {
  return (
    <div className="flex items-center gap-6">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          variant="ghost"
          onClick={() => onFilterChange(filter.name)}
          className={`${
            currentFilter === filter.name
              ? "text-blue-600 font-medium"
              : "text-gray-500 hover:text-blue-600"
          } transition-colors`}
        >
          {filter.name} ({filter.count})
        </Button>
      ))}
    </div>
  )
}