/* eslint-disable */
import { useProjects } from '../useProjects'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'
import {
  DollarSign,
  Globe,
  Paperclip,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import PropTypes from 'prop-types'

const chartData = [
  { date: '01 May', completed: 4, target: 3 },
  { date: '05 May', completed: 4, target: 3 },
  { date: '10 May', completed: 7, target: 5 },
  { date: '15 May', completed: 5, target: 6 },
  { date: '20 May', completed: 8, target: 7 },
  { date: '25 May', completed: 6, target: 7 },
  { date: '30 May', completed: 7, target: 6 },
]

export function ProjectDetails({ projectId }) {
  const { projects } = useProjects()
  const project = projects.find(p => p.id === projectId) || projects[0]

  if (!project) {
    return <div>No project found</div>
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <Badge className="bg-blue-100 text-blue-600">
            {project.status}
          </Badge>
          <Badge variant="outline" className="ml-auto">
            Public project
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Globe className="h-4 w-4" />
          <span>Client:</span>
          <span className="text-blue-600">{project.client}</span>
          <span className="mx-2">•</span>
          <DollarSign className="h-4 w-4" />
          <span>Budget: ${project.budget?.toLocaleString()}</span>
        </div>
      </div>

      {/* Task Progress Chart */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Task completed over time</h2>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Mar 1 - 31, 2022</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#E5E7EB"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Work Loads and Team Members */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Work loads</h2>
            <p className="text-sm text-gray-500 mb-4">Last 7 days</p>
            <div className="space-y-4">
              {project.assignees?.map((assignee, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={assignee.avatar} alt={assignee.name} />
                    <AvatarFallback>{assignee.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{assignee.name}</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Team members</h2>
            <div className="flex -space-x-2 mb-6">
              {project.assignees?.map((member, index) => (
                <Avatar key={index} className="border-2 border-white">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gray-100">
                    {tag.toLowerCase()}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Overview */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Project overview</h2>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <Paperclip className="h-4 w-4 text-gray-400" />
            <span>Files:</span>
            <span>{project.files?.length || 0}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

ProjectDetails.propTypes = {
  projectId: PropTypes.string.isRequired,
}
