import React from 'react'
import { format, parseISO } from 'date-fns'
import { Globe, Users, DollarSign, CalendarIcon, Clock } from 'lucide-react'

export function ProjectInfo({ project }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            {project.type || "Type non défini"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500">Client :</span>
          <span className="text-[#3B82F6]">
            {project.client || "Client indéfini"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500">Budget :</span>
          <span>
            {project.budget
              ? `$${project.budget.toLocaleString()}`
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500">Démarré :</span>
          <span>
            {project.started
              ? format(parseISO(project.started), "dd MMM, yyyy")
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500">Deadline :</span>
          <span>
            {project.deadline
              ? format(parseISO(project.deadline), "dd MMM, yyyy")
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Progression :</span>
          <span className="text-[#F97316]">
            {project.progress || "0%"}
          </span>
        </div>
      </div>
    </div>
  )
}