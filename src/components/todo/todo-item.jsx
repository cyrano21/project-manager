import React from 'react'
import { format } from 'date-fns'
import { Paperclip, PenSquare, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

export function TodoItem({ todo, onUpdate, onDelete }) {
  const getStatusClass = (status) => {
    const classes = {
      DRAFT: "bg-blue-100 text-blue-700",
      URGENT: "bg-orange-100 text-orange-700",
      "ON PROCESS": "bg-cyan-100 text-cyan-700",
      CLOSE: "bg-gray-100 text-gray-700",
    }
    return classes[status] || ""
  }

  return (
    <div className="flex items-start gap-3 py-3 px-2 hover:bg-gray-50 group border-b">
      <Checkbox className="mt-1" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">{todo.title}</span>
          {todo.status && (
            <span className={`text-xs px-2 py-0.5 rounded ${getStatusClass(todo.status)}`}>
              {todo.status}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        {todo.attachments?.length > 0 && (
          <Button variant="ghost" size="sm" className="h-auto p-0">
            <Paperclip className="h-3.5 w-3.5 mr-1" />
            {todo.attachments.length}
          </Button>
        )}
        <span className="whitespace-nowrap">
          {todo.date ? format(new Date(todo.date), "yyyy-MM-dd") : "Date non définie"}
        </span>
        <span className="border-l pl-3 whitespace-nowrap">
          {todo.time || "Heure non définie"}
        </span>
        <div className="opacity-0 group-hover:opacity-100 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onUpdate(todo)}
          >
            <PenSquare className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onDelete(todo.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  )
}