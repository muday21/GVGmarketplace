import { NextRequest, NextResponse } from "next/server"
import { auth } from "../auth"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Use Better Auth's API to resend verification email
    await auth.api.sendVerificationEmail({
      body: { email },
    })

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully"
    })

  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    )
  }
}


