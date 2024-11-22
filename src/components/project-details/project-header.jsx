import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'

export function ProjectHeader({ project }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <Badge
          variant="secondary"
          className="bg-[#E1EFFE] text-[#3B82F6] font-normal"
        >
          {project.status || "Statut indéfini"}
        </Badge>
      </div>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </div>
  )
}