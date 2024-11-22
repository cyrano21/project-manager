import PropTypes from 'prop-types'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'

export function TodoSearch({ value, onChange }) {
  return (
    <div className="flex-1 min-w-[240px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search tasks"
          className="pl-9 bg-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

TodoSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
