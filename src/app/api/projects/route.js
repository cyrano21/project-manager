import { NextResponse } from 'next/server'
import { getProjects, createProject } from '../../../lib/db'

// Helper function to add CORS headers
function corsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function OPTIONS() {
  return corsHeaders(new NextResponse(null, { status: 204 }))
}

export async function GET() {
  try {
    console.log('GET request received')
    const projects = await getProjects()
    console.log('Projects retrieved:', projects)
    return corsHeaders(NextResponse.json(projects))
  } catch (error) {
    console.error("Error fetching projects:", error)
    return corsHeaders(NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    ))
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('POST request received with body:', body)
    const project = await createProject(body)
    console.log('Project created:', project)
    return corsHeaders(NextResponse.json(project, { status: 201 }))
  } catch (error) {
    console.error("Error creating project:", error)
    return corsHeaders(NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    ))
  }
}