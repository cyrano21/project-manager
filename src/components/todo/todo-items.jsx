import React from 'react'
import { TodoItem } from './todo-item'

export function TodoItems({ todos, onUpdate, onDelete }) {
  return (
    <div className="space-y-1 mb-6">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}