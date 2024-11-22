import React, { useState } from 'react'
import { useProjects } from './useProjects'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { LayoutGrid, LayoutList, Kanban, Search, Plus } from 'lucide-react'

export function ProjectListView() {
  const { projects, loading } = useProjects()
  const [currentFilter, setCurrentFilter] = useState('All')

  const filters = [
    { name: 'All', count: projects.length },
    { name: 'Ongoing', count: projects.filter(p => p.status === 'ONGOING').length },
    { name: 'Cancelled', count: projects.filter(p => p.status === 'CANCELLED').length },
    { name: 'Completed', count: projects.filter(p => p.status === 'COMPLETED').length },
    { name: 'Critical', count: projects.filter(p => p.status === 'CRITICAL').length },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-blue-600">Project Hub</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add new project
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            {filters.map(filter => (
              <button
                key={filter.name}
                onClick={() => setCurrentFilter(filter.name)}
                className={`text-sm ${
                  currentFilter === filter.name
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-500'
                }`}
              >
                {filter.name} ({filter.count})
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Kanban className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative w-full mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects"
            className="pl-9 w-full"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 font-medium">PROJECT NAME</th>
              <th className="text-left py-3 font-medium">ASSIGNEES</th>
              <th className="text-left py-3 font-medium">START DATE</th>
              <th className="text-left py-3 font-medium">DEADLINE</th>
              <th className="text-left py-3 font-medium">TASK</th>
              <th className="text-left py-3 font-medium">PROGRESS</th>
              <th className="text-left py-3 font-medium">STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">Loading...</td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">No projects found</td>
              </tr>
            ) : (
              projects.map(project => (
                <tr key={project.id} className="border-b">
                  <td className="py-4">
                    <a href="#" className="text-blue-600 hover:underline">
                      {project.name}
                    </a>
                  </td>
                  <td className="py-4">
                    {project.assignees?.length ? 
                      project.assignees.map(a => a.name).join(', ') : 
                      'No assignees'}
                  </td>
                  <td className="py-4">{project.started}</td>
                  <td className="py-4">{project.deadline}</td>
                  <td className="py-4">{project.tasks?.length || 0}</td>
                  <td className="py-4">{project.progress}%</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                      project.status === 'ONGOING' ? 'bg-blue-100 text-blue-600' :
                      project.status === 'CRITICAL' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <Button variant="ghost" size="sm">...</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>1 to {projects.length} of {projects.length} items</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}