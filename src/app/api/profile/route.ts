import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      headline: true,
      bio: true,
      semester: true,
      department: true,
      roles: true,
      availability: true,
      lookingFor: true,
      interests: true,
      skills: true,
      socialLinks: true,
      linkVisibility: true,
      profileVisibility: true,
      isFounding: true,
      githubData: true,
      createdAt: true,
    } as any,
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  // Only allow updating specific fields
  const allowedFields = [
    "name",
    "image",
    "headline",
    "bio",
    "semester",
    "department",
    "roles",
    "availability",
    "lookingFor",
    "interests",
    "skills",
    "socialLinks",
    "linkVisibility",
    "profileVisibility",
    "isFounding",
    "githubData",
  ]

  const updateData: Record<string, unknown> = {}
  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field]
    }
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
  })

  return NextResponse.json(user)
}
