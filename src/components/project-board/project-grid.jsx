import React from 'react'
import { ProjectCard } from './project-card'

export function ProjectGrid({ projects, onProjectSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onProjectSelect={onProjectSelect}
        />
      ))}
    </div>
  )
}