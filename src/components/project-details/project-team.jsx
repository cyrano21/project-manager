import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function ProjectTeam({ assignees }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex -space-x-2">
          {assignees && assignees.length > 0 ? (
            assignees.map((assignee, index) => (
              <Avatar key={index} className="border-2 border-white">
                {assignee.avatar ? (
                  <AvatarImage
                    src={assignee.avatar}
                    alt={assignee.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {assignee.name ? assignee.name[0] : "?"}
                  </AvatarFallback>
                )}
              </Avatar>
            ))
          ) : (
            <p className="text-gray-500">No team members assigned.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}