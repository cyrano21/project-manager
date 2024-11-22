import { useState, useEffect } from 'react'
import { useProjects } from '../useProjects'

export function useUsers() {
  const { users: contextUsers, setUsers } = useProjects()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const addUser = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      const newUser = await response.json()
      setUsers(prev => [...prev, newUser])
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateUser = async (userData) => {
    try {
      const response = await fetch(`/api/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      const updatedUser = await response.json()
      setUsers(prev => prev.map(user =>
        user.id === userData.id ? updatedUser : user
      ))
      return updatedUser
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteUser = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })
      setUsers(prev => prev.filter(user => user.id !== userId))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    users: contextUsers,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
  }
}
