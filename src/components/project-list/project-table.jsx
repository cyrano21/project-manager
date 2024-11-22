import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { format, parseISO } from 'date-fns'

export function ProjectTable({ projects }) {
  const getStatusColor = (status) => {
    const colors = {
      COMPLETED: "bg-emerald-100 text-emerald-600",
      INACTIVE: "bg-orange-100 text-orange-600",
      ONGOING: "bg-blue-100 text-blue-600",
      CRITICAL: "bg-red-100 text-red-600",
      CANCELLED: "bg-gray-100 text-gray-600",
    }
    return colors[status] || ""
  }

  const getProgressColor = (status) => {
    const colors = {
      COMPLETED: "bg-emerald-500",
      INACTIVE: "bg-orange-500",
      ONGOING: "bg-blue-500",
      CRITICAL: "bg-red-500",
      CANCELLED: "bg-gray-500",
    }
    return colors[status] || "bg-gray-500"
  }

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-t border-b border-gray-200">
          <TableHead className="w-[300px] font-semibold">PROJECT NAME</TableHead>
          <TableHead className="font-semibold">ASSIGNEES</TableHead>
          <TableHead className="font-semibold">START DATE</TableHead>
          <TableHead className="font-semibold">DEADLINE</TableHead>
          <TableHead className="font-semibold">TASK</TableHead>
          <TableHead className="font-semibold">PROGRESS</TableHead>
          <TableHead className="font-semibold">STATUS</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id} className="hover:bg-gray-50">
            <TableCell className="font-medium">
              <a href="#" className="text-blue-600 hover:underline">
                {project.name}
              </a>
            </TableCell>
            <TableCell>
              <div className="flex -space-x-2">
                {project.assignees?.slice(0, 3).map((assignee, index) => (
                  <Avatar
                    key={index}
                    className="border-2 border-white w-8 h-8"
                  >
                    <AvatarImage
                      src={assignee.avatar}
                      alt={assignee.name}
                    />
                    <AvatarFallback>
                      {assignee.name ? assignee.name[0] : "?"}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.assignees?.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                    +{project.assignees.length - 3}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>{formatDate(project.started)}</TableCell>
            <TableCell>{formatDate(project.deadline)}</TableCell>
            <TableCell>{project.taskCount || "0"}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress
                  value={project.progress || 0}
                  className="h-2 w-full bg-gray-100"
                  indicatorClassName={getProgressColor(project.status)}
                />
                <span className="text-sm text-gray-600">
                  {project.progress}%
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}