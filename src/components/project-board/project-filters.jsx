import React from 'react'
import { Button } from '../ui/button'

export function ProjectFilters({ activeFilter, setActiveFilter, projects }) {
  const filters = [
    { name: "All", count: projects.length },
    { name: "Ongoing", count: projects.filter(p => p.status === "ONGOING").length },
    { name: "Cancelled", count: projects.filter(p => p.status === "CANCELLED").length },
    { name: "Completed", count: projects.filter(p => p.status === "COMPLETED").length },
    { name: "Critical", count: projects.filter(p => p.status === "CRITICAL").length },
  ]

  return (
    <div className="flex space-x-4 mb-6">
      {filters.map(filter => (
        <Button
          key={filter.name}
          variant="ghost"
          className={activeFilter === filter.name ? "text-blue-500" : ""}
          onClick={() => setActiveFilter(filter.name)}
        >
          {filter.name} ({filter.count})
        </Button>
      ))}
    </div>
  )
}