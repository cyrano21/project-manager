import { PrismaClient } from '@prisma/client'

let prisma

if (typeof window === 'undefined') {
  // We're on the server
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    // In development, use a global variable to preserve the value
    // across module reloads caused by HMR (Hot Module Replacement)
    if (!global.prisma) {
      global.prisma = new PrismaClient({
        log: ['query'],
      })
    }
    prisma = global.prisma
  }
} else {
  // We're on the client
  prisma = new PrismaClient()
}

export default prisma
