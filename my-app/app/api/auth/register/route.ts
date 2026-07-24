import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    // Mock successful registration
    // In a real app, you would check if email exists, hash password, and save to DB
    
    const newUser = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
    }

    const token = `mock-jwt-token-${Date.now()}`

    return NextResponse.json(
      {
        user: newUser,
        token,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
