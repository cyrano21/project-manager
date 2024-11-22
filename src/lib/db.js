import prisma from './prisma'

const API_URL = '/api';

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }

  return response.json();
}

export async function getProjects() {
  try {
    // Si nous sommes côté serveur, utiliser Prisma directement
    if (typeof window === 'undefined' && prisma) {
      return await prisma.project.findMany({
        include: {
          team: true,
          client: true,
          tags: {
            include: {
              tag: true,
            },
          },
          assignees: true,
          user: true,
        },
      });
    }
    
    // Sinon, faire un appel API
    return await fetchAPI('/projects');
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function createProject(data) {
  if (!data.name || !data.status) {
    throw new Error("Name and status are required fields");
  }

  try {
    if (typeof window === 'undefined' && prisma) {
      return await prisma.project.create({
        data
      });
    }

    return await fetchAPI('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function updateProject(id, data) {
  try {
    if (typeof window === 'undefined' && prisma) {
      return await prisma.project.update({
        where: { id },
        data
      });
    }

    return await fetchAPI(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function deleteProject(id) {
  try {
    if (typeof window === 'undefined' && prisma) {
      return await prisma.project.delete({
        where: { id }
      });
    }

    return await fetchAPI(`/projects/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

// Tasks API functions
export async function getTasks() {
  try {
    if (typeof window === 'undefined' && prisma) {
      return await prisma.task.findMany({
        include: {
          project: true,
          assignees: true,
        }
      });
    }

    return await fetchAPI('/tasks');
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function createTask(data) {
  try {
    if (typeof window === 'undefined' && prisma) {
      return await prisma.task.create({
        data,
        include: {
          project: true,
          assignees: true,
        }
      });
    }

    return await fetchAPI('/tasks', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function updateTask(id, data) {
  try {
    if (typeof window === 'undefined' && prisma) {
      return await prisma.task.update({
        where: { id },
        data,
        include: {
          project: true,
          assignees: true,
        }
      });
    }

    return await fetchAPI(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    if (typeof window === 'undefined' && prisma) {
      return await prisma.task.delete({
        where: { id }
      });
    }

    return await fetchAPI(`/tasks/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}
export async function getTasksByProject(projectId) {
  try {
    if (typeof window === 'undefined' && prisma) {
      return await prisma.task.findMany({
        where: { projectId }
      });
    }

    return await fetchAPI(`/tasks/${projectId}`);
  } catch (error) {
    console.error('Error fetching tasks by project:', error);
    throw error;
  }
}


export async function getAssignees() {
  try {
    if (typeof window === 'undefined' && prisma) {
      return await prisma.assignee.findMany();
    }

    return await fetchAPI('/assignees');
  } catch (error) {
    console.error('Error fetching assignees:', error);
    throw error;
  }
}