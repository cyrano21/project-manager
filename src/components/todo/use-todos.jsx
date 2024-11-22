import { useState } from 'react'
import { tasks as initialTasks } from '../../lib/mock-data'

export function useTodos() {
  const [todos, setTodos] = useState(initialTasks)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addTodo = async (newTodo) => {
    try {
      const todo = {
        id: Math.random().toString(36).substr(2, 9),
        ...newTodo
      }
      setTodos(prev => [...prev, todo])
      return todo
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateTodo = async (todo) => {
    try {
      setTodos(prev => prev.map(t => t.id === todo.id ? todo : t))
      return todo
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteTodo = async (id) => {
    try {
      setTodos(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
  }
}