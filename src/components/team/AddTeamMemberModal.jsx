import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const defaultFormData = {
  name: '',
  role: '',
  email: '',
  phone: '',
  status: 'ACTIVE',
}

export function AddTeamMemberModal({
  isOpen,
  onClose,
  member = null,
  onSuccess = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState(defaultFormData)

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        role: member.role || '',
        email: member.email || '',
        phone: member.phone || '',
        status: member.status || 'ACTIVE',
      })
    } else {
      setFormData(defaultFormData)
    }
  }, [member, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const url = member ? `/api/team/${member.id}` : '/api/team'
      const method = member ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Something went wrong')
      }

      const data = await response.json()
      onSuccess(data)
      onClose()
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>
              {member ? 'Edit Team Member' : 'Add Team Member'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 hover:bg-slate-100 rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <Input
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Enter role"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="ON_LEAVE">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            >
              {isSubmitting ? 'Saving...' : member ? 'Update' : 'Add'} Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}