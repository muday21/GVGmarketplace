import { NextRequest, NextResponse } from "next/server"
import { auth } from "../../auth/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    return NextResponse.json({
      session,
      user: session?.user,
      hasSession: !!session,
      hasUser: !!session?.user,
      userName: session?.user?.name,
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
