import React from 'react'
import { AuthChecker } from '../components/AuthChecker'
import { ProjectBoardView } from '../components/project-board'
import { ProjectProvider } from '../components/ProjectContext'

export default function ProjectsPage() {
  return (
    <ProjectProvider>
      <AuthChecker>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProjectBoardView />
          </div>
        </div>
      </AuthChecker>
    </ProjectProvider>
  )
}