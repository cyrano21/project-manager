import React from 'react'
import { Button } from '../ui/button'

export function ProjectPagination({ 
  currentPage, 
  itemsPerPage, 
  totalItems, 
  onPageChange 
}) {
  return (
    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
      <span>
        {`${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(
          currentPage * itemsPerPage,
          totalItems
        )} of ${totalItems} items`}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-600 text-white"
        >
          {currentPage}
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage * itemsPerPage >= totalItems}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}