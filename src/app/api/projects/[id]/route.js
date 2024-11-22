import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function PUT(request, { params }) {
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const { name, status, image } = await request.json();
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name, status, image }
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
