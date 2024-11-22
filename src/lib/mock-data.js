export const projects = [
  {
    id: '1',
    name: 'Project Alpha',
    description: 'A flagship project with multiple components',
    status: 'ONGOING',
    client: 'Client A',
    budget: 50000,
    started: '2024-01-01',
    deadline: '2024-06-30',
    progress: 25,
    team: 'Development',
    projectLead: 'John Doe',
    defaultTaskView: 'list',
    assignees: [
      { id: '1', name: 'John Doe', avatar: '/default-avatar.webp' },
      { id: '2', name: 'Jane Smith', avatar: '/default-avatar.webp' }
    ],
    tasks: [
      { id: '1', title: 'Task 1', status: 'IN_PROGRESS' },
      { id: '2', title: 'Task 2', status: 'COMPLETED' }
    ]
  },
  {
    id: '2',
    name: 'Project Beta',
    description: 'An innovative solution for modern problems',
    status: 'COMPLETED',
    client: 'Client B',
    budget: 75000,
    started: '2024-02-01',
    deadline: '2024-07-31',
    progress: 100,
    team: 'Design',
    projectLead: 'Jane Smith',
    defaultTaskView: 'board',
    assignees: [
      { id: '3', name: 'Bob Wilson', avatar: '/default-avatar.webp' }
    ],
    tasks: [
      { id: '3', title: 'Task 3', status: 'COMPLETED' }
    ]
  }
]

export const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesigning the company website",
    status: "IN_PROGRESS",
    progress: 60,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-31"),
    team: [],
    client: null,
    tags: [],
    assignees: [],
    user: null,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Building a new mobile application",
    status: "PLANNING",
    progress: 20,
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-06-30"),
    team: [],
    client: null,
    tags: [],
    assignees: [],
    user: null,
  },
];

export const tasks = [
  {
    id: '1',
    title: 'Task 1',
    status: 'IN_PROGRESS',
    projectId: '1',
    dueDateTime: '2024-03-01',
    reminder: '2024-02-28',
    comments: 2
  },
  {
    id: '2',
    title: 'Task 2',
    status: 'COMPLETED',
    projectId: '1',
    dueDateTime: '2024-02-15',
    reminder: null,
    comments: 5
  },
  {
    id: '3',
    title: 'Task 3',
    status: 'COMPLETED',
    projectId: '2',
    dueDateTime: '2024-02-20',
    reminder: null,
    comments: 3
  }
]

export const assignees = [
  { id: '1', name: 'John Doe', avatar: '/default-avatar.webp' },
  { id: '2', name: 'Jane Smith', avatar: '/default-avatar.webp' },
  { id: '3', name: 'Bob Wilson', avatar: '/default-avatar.webp' }
]