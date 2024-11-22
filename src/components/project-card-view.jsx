import React, { useState } from 'react'
import { useProjects } from './useProjects'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Plus, Search, LayoutGrid, LayoutList, Table } from 'lucide-react'
import { format } from 'date-fns'

export function ProjectCardView() {
  const { projects } = useProjects()
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusColor = (status) => {
    const colors = {
      COMPLETED: "bg-green-100 text-green-600",
      ONGOING: "bg-blue-100 text-blue-600",
      CANCELLED: "bg-gray-100 text-gray-600",
      CRITICAL: "bg-red-100 text-red-600",
      INACTIVE: "bg-orange-100 text-orange-600"
    }
    return colors[status] || "bg-gray-100 text-gray-600"
  }

  const getProgressColor = (status) => {
    const colors = {
      COMPLETED: "bg-green-500",
      ONGOING: "bg-blue-500",
      CANCELLED: "bg-gray-500",
      CRITICAL: "bg-red-500",
      INACTIVE: "bg-orange-500"
    }
    return colors[status] || "bg-gray-500"
  }

  const filters = [
    { name: 'All', count: projects.length },
    { name: 'Ongoing', count: projects.filter(p => p.status === 'ONGOING').length },
    { name: 'Cancelled', count: projects.filter(p => p.status === 'CANCELLED').length },
    { name: 'Completed', count: projects.filter(p => p.status === 'COMPLETED').length },
    { name: 'Critical', count: projects.filter(p => p.status === 'CRITICAL').length }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'All' || project.status.toUpperCase() === filter.toUpperCase()
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Projects</h1>
          <span className="text-gray-500">({projects.length})</span>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add new project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {filters.map(({ name, count }) => (
            <button
              key={name}
              onClick={() => setFilter(name)}
              className={`text-sm ${
                filter === name
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {name} ({count})
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="icon">
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Table className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-lg">{project.name}</h3>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Client:</span>
                <span className="text-blue-600">{project.client}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Budget:</span>
                <span>${project.budget?.toLocaleString()}</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress 
                  value={project.progress} 
                  className="h-2"
                  className2={getProgressColor(project.status)}
                />
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Started:</span>
                  <span>{format(new Date(project.started), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Deadline:</span>
                  <span>{format(new Date(project.deadline), 'MMM d, yyyy')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex -space-x-2">
                  {project.assignees?.slice(0, 3).map((assignee, index) => (
                    <Avatar key={index} className="border-2 border-white">
                      <AvatarImage src={assignee.avatar} alt={assignee.name} />
                      <AvatarFallback>{assignee.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  {project.assignees?.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-600 border-2 border-white">
                      +{project.assignees.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{project.tasks?.length || 0}</span>
                  <span>Tasks</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}