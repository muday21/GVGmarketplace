import { NextRequest, NextResponse } from "next/server"
import { auth } from "../auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token")
    const callbackParam = request.nextUrl.searchParams.get("callbackURL")
    const callbackURL = callbackParam && callbackParam !== "/" ? callbackParam : "/auth/verify-email"

    if (!token) {
      const redirectURL = new URL("/auth/verify-email?status=error&reason=missing-token", request.url)
      return NextResponse.redirect(redirectURL)
    }

    const result = await auth.api.verifyEmail({
      query: { token }
    })

    if (result) {
      const redirectURL = new URL(callbackURL, request.url)
      redirectURL.searchParams.set("status", "success")
      return NextResponse.redirect(redirectURL)
    }

    const redirectURL = new URL(callbackURL, request.url)
    redirectURL.searchParams.set("status", "error")
    redirectURL.searchParams.set("reason", "invalid-token")
    return NextResponse.redirect(redirectURL)

  } catch (error) {
    console.error("Email verification (GET) error:", error)
    const redirectURL = new URL("/auth/verify-email?status=error&reason=server-error", request.url)
    return NextResponse.redirect(redirectURL)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Verification token is required" },
        { status: 400 }
      )
    }

    // Use Better Auth's API to verify the email
    const result = await auth.api.verifyEmail({
      query: { token }
    })

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Email verified successfully"
      })
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification token" },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    )
  }
}


