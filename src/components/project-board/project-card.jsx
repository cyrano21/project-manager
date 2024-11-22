import React from 'react'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'

export function ProjectCard({ project, onProjectSelect }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED": return "bg-green-500/10 text-green-500"
      case "ONGOING": return "bg-blue-500/10 text-blue-500"
      case "INACTIVE": return "bg-orange-500/10 text-orange-500"
      case "CRITICAL": return "bg-red-500/10 text-red-500"
      case "CANCELLED": return "bg-gray-500/10 text-gray-500"
      default: return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="relative h-56 rounded-lg overflow-hidden shadow-lg group bg-gray-100">
      <img
        src={project.image || "/default_card.webp"}
        alt={project.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => onProjectSelect(project)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
        </div>
      </div>
    </div>
  )
}