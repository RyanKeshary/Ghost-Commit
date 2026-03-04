import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const user = await (prisma.user as any).findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
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
    },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Respect privacy settings
  if (user.profileVisibility === "private") {
    return NextResponse.json(
      { error: "This profile is private" },
      { status: 403 }
    )
  }

  // Filter out hidden links
  let filteredLinks = user.socialLinks
  if (user.socialLinks && user.linkVisibility) {
    try {
      const links = JSON.parse(user.socialLinks)
      const visibility = JSON.parse(user.linkVisibility)
      const filtered: Record<string, string> = {}
      for (const [key, value] of Object.entries(links)) {
        if (visibility[key] !== false && value) {
          filtered[key] = value as string
        }
      }
      filteredLinks = JSON.stringify(filtered)
    } catch {
      // If JSON parsing fails, just return as-is
    }
  }

  return NextResponse.json({
    ...user,
    socialLinks: filteredLinks,
    linkVisibility: undefined,
  })
}
