import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { getProjects } from '../../lib/db'

export function AddTodoModal({ isOpen, onClose, onSubmit, todo }) {
  const [formData, setFormData] = useState({
    title: '',
    status: 'DRAFT',
    date: '',
    time: '',
    attachments: 0,
    comments: 0,
    projectId: ''
  })
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function loadProjects() {
      try {
        const projectsList = await getProjects()
        setProjects(projectsList)
      } catch (error) {
        console.error('Failed to load projects:', error)
      }
    }
    loadProjects()
  }, [])

  useEffect(() => {
    if (todo) {
      setFormData({
        ...todo,
        date: todo.date || '',
        time: todo.time || '',
        projectId: todo.projectId || ''
      })
    } else {
      setFormData({
        title: '',
        status: 'DRAFT',
        date: '',
        time: '',
        attachments: 0,
        comments: 0,
        projectId: ''
      })
    }
  }, [todo])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(todo ? { ...formData, id: todo.id } : formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {todo ? 'Edit Task' : 'Add New Task'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
                <SelectItem value="ON PROCESS">On Process</SelectItem>
                <SelectItem value="CLOSE">Close</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {todo ? 'Update' : 'Add'} Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}