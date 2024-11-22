import React from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog'
import { useProjects } from './useProjects'
import { AlertTriangle } from 'lucide-react'

export function DeleteProject({ project, onClose }) {
  const { deleteProject } = useProjects()

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      deleteProject(project.id)
      onClose?.()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">Delete Project</DialogTitle>
              <DialogDescription className="text-gray-500 mt-1">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-6">
          <p className="text-gray-700">
            Are you sure you want to delete <span className="font-semibold">{project.name}</span>? 
            All project data including tasks, files, and comments will be permanently removed.
          </p>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete Project
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}