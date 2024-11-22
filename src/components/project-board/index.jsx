import React, { useState } from 'react'
import { useProjects } from '../useProjects'
import { ProjectHeader } from './project-header'
import { ProjectFilters } from './project-filters'
import { ProjectSearch } from './project-search'
import { ProjectGrid } from './project-grid'
import { EditProject } from '../edit-project'
import { DeleteProject } from '../delete-project'
import ProjectModal from '../../modals/ProjectModal'

function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export function ProjectBoardView() {
  const { projects, addProject, loading, error } = useProjects()
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteProject, setDeleteProject] = useState(null)

  const handleAddProject = () => {
    addProject({
      id: generateUniqueId(),
      name: "New Project",
      status: "ONGOING",
      image: "/default_card.webp",
    })
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFilter =
      activeFilter === "All" || project.status === activeFilter.toUpperCase()
    return matchesSearch && matchesFilter
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-6">
      <ProjectHeader
        projectCount={projects.length}
        onAddProject={handleAddProject}
      />

      <ProjectFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        projects={projects}
      />

      <ProjectSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <ProjectGrid
        projects={filteredProjects}
        onProjectSelect={(project) => {
          setSelectedProject(project)
          setModalOpen(true)
        }}
      />

      {modalOpen && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setModalOpen(false)}
        />
      )}

      {selectedProject && (
        <EditProject
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {deleteProject && (
        <DeleteProject
          project={deleteProject}
          onClose={() => setDeleteProject(null)}
        />
      )}
    </div>
  )
}
