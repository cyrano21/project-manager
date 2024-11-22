import React from 'react'
import { Filter, ArrowUpDown } from 'lucide-react'
import { Button } from '../ui/button'

export function TodoFilters({ count }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Button variant="ghost" size="sm" className="text-gray-500">
        <Filter className="h-4 w-4 mr-1" />
        {count} tasks
      </Button>
      <Button variant="ghost" size="sm" className="text-blue-500">
        <ArrowUpDown className="h-4 w-4 mr-1" />
        Sorting
      </Button>
    </div>
  )
}