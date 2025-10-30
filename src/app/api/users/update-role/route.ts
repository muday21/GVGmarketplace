import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

const ALLOWED_ROLES = new Set(["BUYER", "PRODUCER", "ADMIN"])

export async function POST(request: NextRequest) {
  try {
    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      )
    }

    if (!ALLOWED_ROLES.has(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      )
    }

    await prisma.user.update({
      where: { email },
      data: { role }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update user role:", error)
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    )
  }
}
