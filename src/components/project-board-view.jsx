import { useState } from 'react'
import { useProjects } from './useProjects'
import { ProjectHeader } from './project-board/project-header'
import { ProjectFilters } from './project-board/project-filters'
import { ProjectSearch } from './project-board/project-search'
import { ProjectGrid } from './project-board/project-grid'
import { EditProject } from './edit-project'
import { DeleteProject } from './delete-project'
import ProjectModal from '../modals/ProjectModal'

function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export default function ProjectBoardView() {
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
    if (!project) return false; // Ignore les projets non définis
    const matchesSearch = project.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFilter =
      activeFilter === "All" || project.status === activeFilter.toUpperCase()
    return matchesSearch && matchesFilter
  })

  console.log('Projects retrieved:', projects);
  projects.forEach((project, index) => {
    console.log(`Project ${index}:`, project);
  });

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

      {modalOpen && selectedProject && (
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

      {/* Afficher les détails des projets */}
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">Project Details</h2>
        {filteredProjects.map((project) => (
          <div key={project.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Team:</strong> {project.team || 'N/A'}</p>
            <p><strong>Client:</strong> {project.client || 'N/A'}</p>
            <p><strong>Budget:</strong> {project.budget || 'N/A'}</p>
            <p><strong>Description:</strong> {project.description || 'N/A'}</p>
            <p><strong>Started:</strong> {project.started ? new Date(project.started).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Deadline:</strong> {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Project Lead:</strong> {project.projectLead || 'N/A'}</p>
            <p><strong>Progress:</strong> {project.progress || 'N/A'}%</p>
            <p><strong>Tags:</strong> {project.tags || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
