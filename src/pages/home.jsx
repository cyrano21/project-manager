"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProjects } from '../components/useProjects'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { CreateProject } from '../components/create-project'
import { TeamList } from '../components/team/TeamList'

import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Settings,
  Plus,
  ArrowRight,
} from 'lucide-react'

const menuItems = [
  {
    title: 'Projects',
    icon: LayoutDashboard,
    description: 'Manage and track all your projects in one place',
    path: '/projects',
    color: 'bg-blue-500',
    content: 'ProjectsContent'
  },
  {
    title: 'Tasks',
    icon: CheckSquare,
    description: 'Organize and track tasks across all projects',
    path: '/tasks',
    color: 'bg-green-500',
    content: 'TasksContent'
  },
  {
    title: 'Team',
    icon: Users,
    description: 'Manage team members and assignments',
    path: '/team',
    color: 'bg-purple-500',
    content: 'TeamContent'
  },
  {
    title: 'Settings',
    icon: Settings,
    description: 'Configure your workspace preferences',
    path: '/settings',
    color: 'bg-gray-500',
    content: 'SettingsContent'
  },
]

// Content components for each section
const ProjectsContent = () => {
  const router = useRouter();

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Projects Overview</h3>
      <p className="text-gray-600 dark:text-gray-400">
        Create and manage your projects efficiently. Track progress, assign team members,
        and monitor deadlines all in one place.
      </p>
      <div className="mt-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => router.push('/projects')}
        >
          View All Projects
        </Button>
      </div>
    </div>
  );
}
const TasksContent = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Task Management</h3>
    <p className="text-gray-600 dark:text-gray-400">
      Organize tasks, set priorities, and track completion status. Keep your team
      aligned and projects moving forward.
    </p>
    <div className="mt-4">
      <Button className="bg-green-600 hover:bg-green-700 text-white">
        View Task Board
      </Button>
    </div>
  </div>
)

const TeamContent = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Team Management</h3>
      <div className="mt-4">
        <TeamList />
      </div>
    </div>
  )
}

const SettingsContent = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Workspace Settings</h3>
    <p className="text-gray-600 dark:text-gray-400">
      Configure your workspace preferences, manage notifications, and customize your
      experience to match your workflow.
    </p>
    <div className="mt-4">
      <Button className="bg-gray-600 hover:bg-gray-700 text-white">
        Open Settings
      </Button>
    </div>
  </div>
)

export function HomePage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { projects } = useProjects()
  const [selectedContent, setSelectedContent] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // or a loading spinner
  }

  // Calculate overall progress
  const totalProgress = projects.reduce((acc, project) => acc + (project.progress || 0), 0)
  const averageProgress = projects.length ? Math.round(totalProgress / projects.length) : 0

  const renderContent = () => {
    switch (selectedContent) {
      case 'ProjectsContent':
        return <ProjectsContent />
      case 'TasksContent':
        return <TasksContent />
      case 'TeamContent':
        return <TeamContent />
      case 'SettingsContent':
        return <SettingsContent />
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Here's what's happening in your projects
            </p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8 p-6 bg-white dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Progress</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {averageProgress}% Complete
            </span>
          </div>
          <Progress value={averageProgress} className="h-2" />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              className="relative overflow-hidden group hover:shadow-lg transition-shadow dark:bg-gray-800"
            >
              <div className="p-6">
                <div className={`w-12 h-12 ${item.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className={`h-6 w-6 ${item.color} text-opacity-90`} />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.description}</p>
                <Button
                  variant="ghost"
                  className="text-blue-600 dark:text-blue-400 p-0 h-auto group-hover:text-blue-700 dark:group-hover:text-blue-300"
                  onClick={() => setSelectedContent(item.content)}
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {selectedContent && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            {renderContent()}
          </div>
        )}

        {isCreateModalOpen && (
          <CreateProject onClose={() => setIsCreateModalOpen(false)} />
        )}
      </div>
    </div>
  )
}