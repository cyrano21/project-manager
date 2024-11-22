import { useState } from 'react'
import { useProjects } from './useProjects'
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
import PropTypes from 'prop-types'

export function CreateProject({ onClose }) {
  const { addProject } = useProjects()
  const [startDate, setStartDate] = useState()
  const [deadline, setDeadline] = useState()
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.target)
      const projectData = {
        name: formData.get('title'),
        description: formData.get('overview'),
        privacy: formData.get('privacy'),
        team: formData.get('team'),
        assignees: formData.get('assignees') ? [formData.get('assignees')] : [],
        projectLead: formData.get('lead'),
        started: startDate ? format(startDate, 'yyyy-MM-dd') : null,
        deadline: deadline ? format(deadline, 'yyyy-MM-dd') : null,
        client: formData.get('client'),
        budget: parseFloat(formData.get('budget')),
        tags: formData.get('tags'),
        defaultTaskView: formData.get('taskView'),
        status: 'ONGOING',
        progress: 0,
      }

      const newProject = await addProject(projectData)
      if (onClose) {
        onClose(newProject)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-50">
        <DialogHeader className="space-y-4">
          <nav className="flex items-center space-x-2 text-sm">
            <span className="text-blue-600 cursor-pointer hover:underline">Projects</span>
            <ChevronRight className="h-4 w-4 text-blue-400" />
            <span className="text-indigo-600 font-medium">Create</span>
          </nav>
          <DialogTitle className="text-3xl font-bold text-indigo-900">
            Create a project
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error: </strong>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          <FormField
            label="Project Title"
            name="title"
            icon={<Briefcase className="w-4 h-4" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect
              label="Project Privacy"
              name="privacy"
              icon={<Lock className="w-4 h-4" />}
              options={[
                { value: 'public', label: 'Public' },
                { value: 'private', label: 'Private' },
                { value: 'team', label: 'Team Only' },
              ]}
            />

            <FormSelect
              label="Team"
              name="team"
              icon={<Users className="w-4 h-4" />}
              options={[
                { value: 'design', label: 'Design Team' },
                { value: 'development', label: 'Development Team' },
                { value: 'marketing', label: 'Marketing Team' },
              ]}
            />

            <FormSelect
              label="People"
              name="assignees"
              icon={<Users className="w-4 h-4" />}
              options={[
                { value: 'user1', label: 'User 1' },
                { value: 'user2', label: 'User 2' },
                { value: 'user3', label: 'User 3' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect
              label="Project Lead"
              name="lead"
              icon={<Users className="w-4 h-4" />}
              options={[
                { value: 'admin1', label: 'Admin 1' },
                { value: 'admin2', label: 'Admin 2' },
              ]}
            />

            <DatePicker
              label="Start Date"
              selected={startDate}
              onSelect={setStartDate}
            />

            <DatePicker
              label="Deadline"
              selected={deadline}
              onSelect={setDeadline}
            />
          </div>

          <FormTextarea
            label="Project Overview"
            name="overview"
            icon={<Briefcase className="w-4 h-4" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Client"
              name="client"
              icon={<Briefcase className="w-4 h-4" />}
              options={[
                { value: 'client1', label: 'Client 1' },
                { value: 'client2', label: 'Client 2' },
                { value: 'client3', label: 'Client 3' },
              ]}
            />

            <FormField
              label="Budget"
              name="budget"
              type="number"
              icon={<DollarSign className="w-4 h-4" />}
            />
          </div>

          <FormSelect
            label="Add Tags"
            name="tags"
            icon={<Tag className="w-4 h-4" />}
            options={[
              { value: 'tag1', label: 'Tag 1' },
              { value: 'tag2', label: 'Tag 2' },
              { value: 'tag3', label: 'Tag 3' },
            ]}
          />

          <FormSelect
            label="Default Task View"
            name="taskView"
            icon={<Layout className="w-4 h-4" />}
            options={[
              { value: 'list', label: 'List View' },
              { value: 'board', label: 'Board View' },
              { value: 'calendar', label: 'Calendar View' },
            ]}
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
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

CreateProject.propTypes = {
  onClose: PropTypes.func,
}

function FormField({ label, name, type = 'text', icon }) {
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
        className="w-full border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.node,
}

function FormSelect({ label, name, options, icon }) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="text-sm font-medium text-indigo-700 flex items-center gap-2"
      >
        {icon}
        {label}
      </Label>
      <Select name={name}>
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

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  icon: PropTypes.node,
}

function FormTextarea({ label, name, icon }) {
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
        className="w-full min-h-[120px] border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  )
}

FormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.node,
}

function DatePicker({ label, selected, onSelect }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
        <CalendarIcon className="w-4 h-4" />
        {label}
      </Label>
      <Popover>
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
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func.isRequired,
}
