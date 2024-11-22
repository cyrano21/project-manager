import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Paperclip } from 'lucide-react'

export function ProjectOverview({ project }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Aperçu du projet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{project.overview}</p>
        <div className="flex items-center gap-2 text-sm">
          <Paperclip className="h-4 w-4 text-gray-400" />
          <span>Pièces jointes :</span>
          <span>{project.attachments?.length || 0}</span>
        </div>
      </CardContent>
    </Card>
  )
}