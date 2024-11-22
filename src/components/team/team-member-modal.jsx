import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function TeamMemberModal({ member, onClose, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {member ? 'Edit Team Member' : 'Add Team Member'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue={member?.name}
              placeholder="Enter name"
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              defaultValue={member?.role}
              placeholder="Enter role"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={member?.email}
              placeholder="Enter email"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              defaultValue={member?.phone}
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {member ? 'Update' : 'Add'} Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}