import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { reportedId, reason, description } = await request.json()

    if (!reportedId || !reason) {
      return NextResponse.json({ error: "Missing reportedId or reason" }, { status: 400 })
    }

    // Create report entry
    const report = await prisma.report.create({
      data: {
        reporterId: session.user.id,
        reportedId: reportedId,
        reason: reason,
        description: description,
      }
    })

    // Optionally auto-block if the user checked "also block this person"
    // For now, these are separate actions to keep UI clear.

    return NextResponse.json({ 
        success: true, 
        message: "Report submitted successfully. Our team will review it.",
        reportId: report.id 
    })
  } catch (error) {
    console.error("Report API Error:", error)
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 })
  }
}
