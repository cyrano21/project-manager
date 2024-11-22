import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

export function generateChartData(tasks) {
  function isValidDate(dateString) {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  }

  const taskCountsByDate = tasks.reduce((acc, task) => {
    if (isValidDate(task.date)) {
      const dateKey = format(new Date(task.date), "yyyy-MM-dd")
      if (!acc[dateKey]) {
        acc[dateKey] = 0
      }
      if (task.status === "CLOSE") {
        acc[dateKey] += 1
      }
    }
    return acc
  }, {})

  const today = new Date()
  const startDate = startOfMonth(today)
  const endDate = endOfMonth(today)

  const dates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  return dates.map((date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    return {
      date: format(date, "dd MMM"),
      completedTasks: taskCountsByDate[dateKey] || 0,
    }
  })
}