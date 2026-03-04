import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { blockedId } = await request.json()

    if (!blockedId) {
      return NextResponse.json({ error: "Missing blockedId" }, { status: 400 })
    }

    if (blockedId === session.user.id) {
      return NextResponse.json({ error: "You cannot block yourself" }, { status: 400 })
    }

    // Create block entry (using upsert or simple create with try-catch for uniqueness)
    await prisma.block.create({
      data: {
        blockerId: session.user.id,
        blockedId: blockedId,
      }
    })

    // Also remove any existing matches or messages between them? 
    // For a hackathon, let's keep it simple and just block future interaction.
    // But logically, we should probably delete matches.
    await prisma.match.deleteMany({
      where: {
        OR: [
          { user1Id: session.user.id, user2Id: blockedId },
          { user1Id: blockedId, user2Id: session.user.id }
        ]
      }
    })

    return NextResponse.json({ success: true, message: "User blocked successfully" })
  } catch (error: any) {
    if (error.code === 'P2002') {
        return NextResponse.json({ error: "User already blocked" }, { status: 400 })
    }
    console.error("Block API Error:", error)
    return NextResponse.json({ error: "Failed to block user" }, { status: 500 })
  }
}
