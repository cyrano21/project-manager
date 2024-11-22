import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Search, ArrowUpDown, Plus, Paperclip, MessageSquare, PenSquare, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/checkbox'
import { Card } from '../ui/card'
import { format, parseISO } from 'date-fns'
import { AddTodoModal } from './add-todo-modal'
import { getTasks, createTask, updateTask, deleteTask } from '../../lib/db'
import { useToast } from '../ui/use-toast'

const defaultTodos = []

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'dd MMM, yyyy');
  } catch (error) {
    console.error('Invalid date format:', dateString);
    return '';
  }
}

export function TodoList({
  initialTodos = defaultTodos,
  searchTerm = '',
  sortOrder = 'desc',
  isModalOpen = false,
  selectedTodo = null
}) {
  const { toast } = useToast()
  const [todos, setTodos] = useState(initialTodos)
  const [searchTermState, setSearchTerm] = useState(searchTerm)
  const [sortOrderState, setSortOrder] = useState(sortOrder)
  const [isModalOpenState, setIsModalOpen] = useState(isModalOpen)
  const [selectedTodoState, setSelectedTodo] = useState(selectedTodo)

  useEffect(() => {
    async function loadTasks() {
      try {
        const tasks = await getTasks()
        setTodos(tasks)
      } catch (err) {
        console.error('Failed to load tasks:', err)
      }
    }
    loadTasks()
  }, [])

  const getStatusColor = (status) => {
    const colors = {
      DRAFT: "bg-blue-100 text-blue-700",
      URGENT: "bg-orange-100 text-orange-700",
      "ON PROCESS": "bg-cyan-100 text-cyan-700",
      DONE: "bg-green-100 text-green-700",
      CANCELED: "bg-red-100 text-red-700"
    }
    return colors[status] || "bg-gray-100 text-gray-700"
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrderState === 'asc' ? 'desc' : 'asc')
  }

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTermState.toLowerCase())
  )

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // Gérer le cas où date est undefined
    const dateA = a.date ? new Date(a.date + ' ' + (a.time || '00:00')) : new Date(0);
    const dateB = b.date ? new Date(b.date + ' ' + (b.time || '00:00')) : new Date(0);

    if (sortOrderState === 'asc') {
      return dateA - dateB;
    }
    return dateB - dateA;
  });

  const handleAddTask = async (taskData) => {
    try {
      // Ajouter le projectId du projet actuel ou laisser undefined pour utiliser le projet par défaut
      const newTask = await createTask({
        ...taskData,
        projectId: undefined, // Le backend créera un projet par défaut si nécessaire
        include: {
          project: true
        }
      });
      setTodos([...todos, newTask]);
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: "Task added successfully"
      });
    } catch (error) {
      console.error('Failed to add task:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add task"
      });
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await updateTask(taskData.id, taskData);
      setTodos(todos.map(todo => todo.id === taskData.id ? updatedTask : todo));
      setIsModalOpen(false);
      setSelectedTodo(null);
      toast({
        title: "Success",
        description: "Task updated successfully"
      });
    } catch (error) {
      console.error('Failed to update task:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task"
      });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTodos(todos.filter(todo => todo.id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully"
      });
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task"
      });
    }
  };

  const handleEditTask = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
      <div className="flex-1 mr-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search todo..."
              value={searchTermState}
              onChange={handleSearch}
              className="w-full pl-10"
            />
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSortOrder}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
        <Button
          className="ml-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Todo
        </Button>
      </div>

      <div className="space-y-2">
        {sortedTodos.map((todo) => (
          <Card key={todo.id} className="p-4 group hover:shadow-md transition-shadow duration-200 border-l-4 hover:border-blue-500">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox id={`todo-${todo.id}`} className="text-blue-500 focus:ring-blue-500" />
                  <div>
                  <label
                      htmlFor={`todo-${todo.id}`}
                      className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    >
                      {todo.title}
                      {todo.project && (
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          • {todo.project.name}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center hover:text-blue-600 transition-colors duration-200">
                      <Paperclip className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm font-medium">{todo.attachments}</span>
                    </div>
                    <div className="flex items-center ml-4 hover:text-blue-600 transition-colors duration-200">
                      <MessageSquare className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm font-medium">{todo.comments}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(todo.status)} px-3 py-1 rounded-full font-medium text-xs uppercase tracking-wider`}>
                    {todo.status}
                  </Badge>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => handleEditTask(todo)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      onClick={() => handleDeleteTask(todo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end text-sm">
                <div className="flex items-center gap-4 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  {todo.date && <span className="font-medium">{formatDate(todo.date)}</span>}
                  {todo.date && todo.time && <span className="text-gray-300">|</span>}
                  {todo.time && <span className="font-medium">{todo.time}</span>}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddTodoModal
        isOpen={isModalOpenState}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTodo(null)
        }}
        todo={selectedTodoState}
        onSubmit={selectedTodoState ? handleUpdateTask : handleAddTask}
      />
    </div>
  )
}

TodoList.propTypes = {
  initialTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      attachments: PropTypes.number,
      date: PropTypes.string,
      time: PropTypes.string,
      comments: PropTypes.number
    })
  ),
  searchTerm: PropTypes.string,
  sortOrder: PropTypes.oneOf(['asc', 'desc']),
  isModalOpen: PropTypes.bool,
  selectedTodo: PropTypes.object
}
