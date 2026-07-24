import { NextResponse } from "next/server"

// Mock database for Phase 1
const mockUsers = [
  {
    id: "1",
    email: "demo@creditlens.com",
    password: "password123", // In a real app, this would be hashed
    name: "Demo User",
  }
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Mock authentication
    const user = mockUsers.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Return user without password and a mock token
    const { password: _, ...userWithoutPassword } = user
    const token = `mock-jwt-token-${Date.now()}`

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
