import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// Helper function to add CORS headers
function corsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function OPTIONS() {
  return corsHeaders(new NextResponse(null, { status: 204 }))
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return corsHeaders(NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      ))
    }

    const userId = session.user.id
    
    let settings = await prisma.settings.findUnique({
      where: {
        userId
      }
    })

    if (!settings) {
      // Create default settings for the user
      settings = await prisma.settings.create({
        data: {
          companyName: 'My Company',
          companyEmail: `company_${userId}@example.com`,
          currency: 'USD',
          dateFormat: 'DD/MM/YYYY',
          timeZone: 'UTC',
          theme: 'light',
          notifications: {
            email: false,
            push: false,
            updates: false
          },
          fiscalYear: new Date().getFullYear().toString(),
          userId
        }
      })
    }

    return corsHeaders(NextResponse.json(settings))
  } catch (error) {
    console.error('Error fetching settings:', error)
    return corsHeaders(NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    ))
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return corsHeaders(NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      ))
    }

    const userId = session.user.id
    const data = await request.json()

    // Validate required fields
    if (!data.companyName || !data.companyEmail) {
      return corsHeaders(NextResponse.json(
        { error: 'Company name and email are required' },
        { status: 400 }
      ))
    }

    // Ensure notifications is properly formatted as JSON
    if (data.notifications && typeof data.notifications === 'string') {
      try {
        data.notifications = JSON.parse(data.notifications)
      } catch (e) {
        return corsHeaders(NextResponse.json(
          { error: 'Invalid notifications format' },
          { status: 400 }
        ))
      }
    }

    const settings = await prisma.settings.upsert({
      where: {
        userId
      },
      update: {
        ...data,
        updatedAt: new Date()
      },
      create: {
        ...data,
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return corsHeaders(NextResponse.json(settings))
  } catch (error) {
    console.error('Error updating settings:', error)
    return corsHeaders(NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    ))
  }
}