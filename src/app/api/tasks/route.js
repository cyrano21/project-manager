import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { dueDateTime: 'asc' },
      include: {
        project: true
      }
    });

    // Formater les dates pour correspondre au format attendu
    const formattedTasks = tasks.map(task => ({
      ...task,
      date: task.date || task.dueDateTime?.toISOString().split('T')[0],
      time: task.time || task.dueDateTime?.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      })
    }));

    return NextResponse.json(formattedTasks);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Si aucun projectId n'est fourni, créer ou utiliser un projet par défaut
    let projectId = data.projectId;
    if (!projectId) {
      const defaultProject = await prisma.project.findFirst({
        where: { name: 'Default Project' }
      });

      if (defaultProject) {
        projectId = defaultProject.id;
      } else {
        const newProject = await prisma.project.create({
          data: {
            name: 'Default Project',
            status: 'ACTIVE',
            progress: 0
          }
        });
        projectId = newProject.id;
      }
    }

    const task = await prisma.task.create({
      data: {
        title: data.title,
        status: data.status,
        attachments: data.attachments || 0,
        comments: data.comments || 0,
        date: data.date,
        time: data.time,
        dueDateTime: data.dueDateTime ? new Date(data.dueDateTime) : null,
        reminder: data.reminder ? new Date(data.reminder) : null,
        projectId: projectId,
      },
      include: {
        project: true
      }
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks/[id]
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        title: data.title,
        status: data.status,
        attachments: data.attachments,
        comments: data.comments,
        date: data.date,
        time: data.time,
        dueDateTime: data.dueDateTime ? new Date(data.dueDateTime) : undefined,
        reminder: data.reminder ? new Date(data.reminder) : undefined,
        projectId: data.projectId,
      },
      include: {
        project: true
      }
    });
    return NextResponse.json(task);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id]
export async function DELETE(request, { params }) {
  try {
    await prisma.task.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}