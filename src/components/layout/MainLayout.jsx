"use client";

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { HomePage } from '../../pages/home'
import { ProjectListView } from '../project-list-view'
import { ProjectCardView } from '../project-card-view'
import { ProjectBoardView } from '../project-board'
import { TodoList } from '../todo/todo-list'
import { ProjectDetails } from '../project-details'
import { CreateProject } from '../create-project'
import { TeamManagement } from '../team'
import { WorkspaceSettings } from '../settings'

export function MainLayout() {
  const [activeView, setActiveView] = useState('home')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <HomePage />
      case 'list':
        return <ProjectListView />
      case 'card':
        return <ProjectCardView />
      case 'board':
        return <ProjectBoardView />
      case 'todo':
        return <TodoList />
      case 'details':
        if (selectedProjectId === null) {
          return <div>Aucun projet sélectionné</div>
        }
        return <ProjectDetails projectId={selectedProjectId} />
      case 'team':
        return <TeamManagement />
      case 'settings':
        return <WorkspaceSettings />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onCreateNew={() => setIsCreateModalOpen(true)}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {isCreateModalOpen && (
        <CreateProject
          onClose={(newProject) => {
            setIsCreateModalOpen(false)
            if (newProject) {
              setActiveView('list')
              setSelectedProjectId(newProject.id) // Utiliser setSelectedProjectId ici
            }
          }}
        />
      )}
    </div>
  )
}
