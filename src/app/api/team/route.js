import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// Helper function to add CORS headers
function corsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function OPTIONS() {
  return corsHeaders(new NextResponse(null, { status: 204 }))
}

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { name: 'asc' }
    })
    return corsHeaders(NextResponse.json(members))
  } catch (error) {
    console.error('Error fetching team members:', error)
    return corsHeaders(NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    ))
  }
}

export async function POST(request) {
  try {
    const { name, email, role, status } = await request.json()

    const existingMember = await prisma.teamMember.findUnique({
      where: { email }
    })

    if (existingMember) {
      return corsHeaders(NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      ))
    }

    const newMember = await prisma.teamMember.create({
      data: {
        name,
        email,
        role,
        status: status || 'ACTIVE'
      }
    })

    return corsHeaders(NextResponse.json(newMember, { status: 201 }))
  } catch (error) {
    console.error('Error adding team member:', error)
    return corsHeaders(NextResponse.json(
      { error: 'Failed to add team member' },
      { status: 500 }
    ))
  }
}

export async function PUT(request) {
  try {
    const { id, name, email, role, status } = await request.json()

    const existingMember = await prisma.teamMember.findFirst({
      where: {
        email,
        id: { not: id }
      }
    })

    if (existingMember) {
      return corsHeaders(NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      ))
    }

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        email,
        role,
        status
      }
    })

    return corsHeaders(NextResponse.json(updatedMember))
  } catch (error) {
    console.error('Error updating team member:', error)
    return corsHeaders(NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    ))
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return corsHeaders(NextResponse.json(
        { error: 'Member ID is required' },
        { status: 400 }
      ))
    }

    await prisma.teamMember.delete({
      where: { id }
    })

    return corsHeaders(new NextResponse(null, { status: 204 }))
  } catch (error) {
    console.error('Error deleting team member:', error)
    return corsHeaders(NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    ))
  }
}