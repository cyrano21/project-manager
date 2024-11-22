import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

export function ProjectSearch({ value, onChange }) {
  return (
    <div className="relative w-[320px]">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search projects"
        className="pl-9 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}