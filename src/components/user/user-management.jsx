import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { UserForm } from './user-form'
import { useUsers } from './use-users'

export function UserManagement({ onClose }) {
  const { addUser, updateUser, deleteUser } = useUsers()
  const [selectedUser, setSelectedUser] = useState(null)

  const handleSubmit = async (userData) => {
    if (selectedUser) {
      await updateUser({ ...selectedUser, ...userData })
    } else {
      await addUser(userData)
    }
    onClose?.()
  }

  const handleDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id)
      onClose?.()
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>User Management</DialogTitle>
        </DialogHeader>
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}