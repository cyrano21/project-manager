
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CheckSquare, MoreHorizontal } from 'lucide-react'

export function ProjectTasks({ tasks }) {
  return (
    <Card className="bg-white">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Project Tasks</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700 font-medium">
                    {task.title}
                  </span>
                  {task.status && (
                    <Badge
                      variant="secondary"
                      className={`text-xs px-2 py-0.5 rounded ${
                        task.status === "DRAFT"
                          ? "bg-blue-100 text-blue-700"
                          : task.status === "URGENT"
                          ? "bg-orange-100 text-orange-700"
                          : task.status === "ON PROCESS"
                          ? "bg-cyan-100 text-cyan-700"
                          : task.status === "CLOSE"
                          ? "bg-gray-100 text-gray-700"
                          : ""
                      }`}
                    >
                      {task.status}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    {task.date
                      ? format(new Date(task.date), "dd MMM, yyyy")
                      : ""}
                  </span>
                  <span>{task.time || ""}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks for this project.</p>
        )}
      </CardContent>
    </Card>
  )
}

ProjectTasks.propTypes = {
  tasks: PropTypes.array.isRequired
}
