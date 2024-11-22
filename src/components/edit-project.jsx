import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import {
  Calendar as CalendarIcon,
  ChevronRight,
  Users,
  Tag,
  Lock,
  Briefcase,
  DollarSign,
  Layout,
} from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '../lib/utils'
import { useProjects } from './useProjects'

export function EditProject({ project, onClose }) {
  const { updateProject } = useProjects()
  const [startDate, setStartDate] = useState(project?.started ? new Date(project.started) : null)
  const [deadline, setDeadline] = useState(project?.deadline ? new Date(project.deadline) : null)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target)
      const updatedProjectData = {
        id: project.id,
        name: formData.get('title'),
        description: formData.get('overview'),
        privacy: formData.get('privacy') || '',
        team: formData.get('team') || '',
        assignees: formData.get('assignees') ? [formData.get('assignees')] : [],
        projectLead: formData.get('lead') || '',
        started: startDate ? format(startDate, 'yyyy-MM-dd') : null,
        deadline: deadline ? format(deadline, 'yyyy-MM-dd') : null,
        client: formData.get('client') || '',
        budget: parseFloat(formData.get('budget')) || 0,
        tags: formData.get('tags') || '',
        defaultTaskView: formData.get('taskView') || 'list',
        status: formData.get('status') || 'ONGOING',
        progress: parseFloat(formData.get('progress')) || 0,
      }

      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProjectData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update project')
      }

      const updatedProject = await response.json()
      await updateProject(updatedProject.id, updatedProjectData)

      if (onClose) {
        onClose(updatedProject)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!project) return null

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <DialogContent
        className="max-w-5xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-50"
        description="Edit project details and settings"
        aria-describedby="dialog-description"
      >
        <DialogHeader className="space-y-4">
          <nav className="flex items-center space-x-2 text-sm">
            <span className="text-blue-600 cursor-pointer hover:underline">Projects</span>
            <ChevronRight className="h-4 w-4 text-blue-400" />
            <span className="text-indigo-600 font-medium">Edit Project</span>
          </nav>
          <DialogTitle className="text-3xl font-bold text-indigo-900">
            Edit {project.name}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          <FormField
            icon={<Briefcase className="w-4 h-4" />}
            label="Project Title"
            name="title"
            defaultValue={project.name}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect
              icon={<Lock className="w-4 h-4" />}
              label="Project Privacy"
              name="privacy"
              defaultValue={project.privacy || ''}
              options={[
                { value: 'public', label: 'Public' },
                { value: 'private', label: 'Private' },
                { value: 'team', label: 'Team Only' },
              ]}
            />

            <FormSelect
              icon={<Users className="w-4 h-4" />}
              label="Team"
              name="team"
              defaultValue={project.team || ''}
              options={[
                { value: 'design', label: 'Design Team' },
                { value: 'development', label: 'Development Team' },
                { value: 'marketing', label: 'Marketing Team' },
              ]}
            />

            <FormSelect
              icon={<Users className="w-4 h-4" />}
              label="Project Lead"
              name="lead"
              defaultValue={project.projectLead || ''}
              options={[
                { value: 'admin1', label: 'Admin 1' },
                { value: 'admin2', label: 'Admin 2' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker
              label="Start Date"
              selected={startDate}
              onSelect={(date) => setStartDate(date)}
            />

            <DatePicker
              label="Deadline"
              selected={deadline}
              onSelect={(date) => setDeadline(date)}
            />
          </div>

          <FormTextarea
            icon={<Briefcase className="w-4 h-4" />}
            label="Project Overview"
            name="overview"
            defaultValue={project.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              icon={<Briefcase className="w-4 h-4" />}
              label="Client"
              name="client"
              defaultValue={project.client || ''}
              options={[
                { value: 'client1', label: 'Client 1' },
                { value: 'client2', label: 'Client 2' },
                { value: 'client3', label: 'Client 3' },
              ]}
            />

            <FormField
              icon={<DollarSign className="w-4 h-4" />}
              label="Budget"
              name="budget"
              type="number"
              defaultValue={project.budget}
            />
          </div>

          <FormSelect
            icon={<Tag className="w-4 h-4" />}
            label="Tags"
            name="tags"
            defaultValue={project.tags || ''}
            options={[
              { value: 'tag1', label: 'Tag 1' },
              { value: 'tag2', label: 'Tag 2' },
              { value: 'tag3', label: 'Tag 3' },
            ]}
          />

          <FormSelect
            icon={<Layout className="w-4 h-4" />}
            label="Default Task View"
            name="taskView"
            defaultValue={project.defaultTaskView || ''}
            options={[
              { value: 'list', label: 'List View' },
              { value: 'board', label: 'Board View' },
              { value: 'calendar', label: 'Calendar View' },
            ]}
          />

          <FormSelect
            icon={<Briefcase className="w-4 h-4" />}
            label="Project Status"
            name="status"
            defaultValue={project.status || ''}
            options={[
              { value: 'ONGOING', label: 'Ongoing' },
              { value: 'COMPLETED', label: 'Completed' },
              { value: 'CANCELLED', label: 'Cancelled' },
            ]}
          />

          <FormField
            icon={<Briefcase className="w-4 h-4" />}
            label="Project Progress"
            name="progress"
            type="number"
            min="0"
            max="100"
            defaultValue={project.progress}
          />

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="text-indigo-600 hover:text-indigo-800 border-indigo-200 hover:border-indigo-400"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function FormField({ icon, label, name, type = 'text', defaultValue = '', ...props }) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="text-sm font-medium text-indigo-700 flex items-center gap-2"
      >
        {icon}
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
        {...props}
      />
    </div>
  )
}

function FormSelect({ icon, label, name, options, defaultValue = '' }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="text-sm font-medium text-indigo-700 flex items-center gap-2"
      >
        {icon}
        {label}
      </Label>
      <Select
        name={name}
        value={selectedValue}
        onValueChange={(value) => setSelectedValue(value)}
      >
        <SelectTrigger id={name} className="w-full border-indigo-200">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function FormTextarea({ icon, label, name, defaultValue = '' }) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="text-sm font-medium text-indigo-700 flex items-center gap-2"
      >
        {icon}
        {label}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full min-h-[120px] border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  )
}

function DatePicker({ label, selected, onSelect }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
        <CalendarIcon className="w-4 h-4" />
        {label}
      </Label>
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-indigo-200",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? format(selected, "PPP") : `Select ${label.toLowerCase()}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" side="bottom">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                onSelect(date); // Met à jour la date sélectionnée
              }
            }}
            initialFocus
            disabled={(date) => date < new Date("1900-01-01") || date > new Date("2100-01-01")}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
