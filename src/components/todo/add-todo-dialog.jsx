import React, { useState, useRef } from 'react'
import { Plus, Paperclip, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from '../ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useProjects } from '../useProjects'

export function AddTodoDialog({ onAdd }) {
  const { projects, loading } = useProjects()
  const fileInputRef = useRef(null)
  const [newTask, setNewTask] = useState({
    title: "",
    status: "DRAFT",
    attachments: [],
    date: "",
    time: "",
    reminder: "",
    projectId: "",
    comments: 0,
  })

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    setNewTask(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  const handleRemoveFile = (index) => {
    setNewTask(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    if (!newTask.title.trim()) {
      alert("Please enter a title for the task")
      return
    }

    await onAdd(newTask)
    setNewTask({
      title: "",
      status: "DRAFT",
      attachments: [],
      date: "",
      time: "",
      reminder: "",
      projectId: "",
      comments: 0,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Add new task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-blue-50 to-indigo-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-700 mb-4">
            Add new task
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new task.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <FormField
            label="Title"
            input={
              <Input
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="col-span-3"
                placeholder="Enter task title"
              />
            }
          />

          <FormField
            label="Status"
            input={
              <Select
                onValueChange={(value) => setNewTask({ ...newTask, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">DRAFT</SelectItem>
                  <SelectItem value="URGENT">URGENT</SelectItem>
                  <SelectItem value="ON PROCESS">ON PROCESS</SelectItem>
                  <SelectItem value="CLOSE">CLOSE</SelectItem>
                </SelectContent>
              </Select>
            }
          />

<FormField
            label="Project"
            input={
              <Select
                onValueChange={(value) => setNewTask({ ...newTask, projectId: value })}
                disabled={loading}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={loading ? "Loading projects..." : "Select project"} />
                </SelectTrigger>
                <SelectContent>
                  {!loading && projects?.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            }
          />

          <FormField
            label="Date"
            input={
              <Input
                type="date"
                value={newTask.date}
                onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                className="col-span-3"
              />
            }
          />

          <FormField
            label="Time"
            input={
              <Input
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                className="col-span-3"
              />
            }
          />

          <FormField
            label="Reminder"
            input={
              <Input
                type="datetime-local"
                value={newTask.reminder}
                onChange={(e) => setNewTask({ ...newTask, reminder: e.target.value })}
                className="col-span-3"
              />
            }
          />

          <FormField
            label="Files"
            input={
              <div className="col-span-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-green-100 hover:bg-green-200 text-green-600"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach files
                  </Button>
                  {newTask.attachments.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {newTask.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <Paperclip className="h-4 w-4 text-blue-500" />
                            <span className="text-sm truncate">{file.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 hover:bg-red-100 hover:text-red-600"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            }
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Add Task
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="ml-2 bg-red-100 hover:bg-red-200 text-red-600"
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FormField({ label, input }) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right font-semibold text-gray-700">{label}</Label>
      {input}
    </div>
  )
}
