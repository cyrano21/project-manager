import React, { useState } from 'react'
import { useProjects } from '../components/useProjects'
import ProjectModal from '../modals/ProjectModal'
import { Button } from '../components/ui/button'

export default function ProjectModalPage() {
  const { projects, loading, error } = useProjects()
  const [selectedProject, setSelectedProject] = useState(null)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!projects.length) return <div>No projects available</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Project Details</h1>
      
      <div className="space-y-4">
        {projects.map(project => (
          <div 
            key={project.id} 
            className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <Button 
                onClick={() => setSelectedProject(project)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  )
}