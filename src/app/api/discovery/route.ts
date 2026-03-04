
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: Request) {
  const session = await auth()
  const currentUserId = session?.user?.id

  const { searchParams } = new URL(request.url)
  
  // Filters
  const semester = searchParams.get("semester")
  const department = searchParams.get("department")
  const role = searchParams.get("role")
  const skill = searchParams.get("skill")
  const availability = searchParams.get("availability")
  
  // Sort
  const sort = searchParams.get("sort") || "recent" 

  try {
    // 1. Fetch base users
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const users = await (prisma.user as any).findMany({
      where: {
        profileVisibility: "public",
        ...(currentUserId ? { 
          AND: [
            { NOT: { id: currentUserId } },
            { 
              blocksReceived: { 
                none: { blockerId: currentUserId } 
              } 
            },
            { 
              blocksGiven: { 
                none: { blockedId: currentUserId } 
              } 
            }
          ]
        } : {}),
        ...(semester ? { semester: parseInt(semester) } : {}),
        ...(department ? { department: department } : {}),
        ...(availability ? { availability: { gte: parseInt(availability) } } : {}),
      },
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
        isFounding: true,
        githubData: true,
        updatedAt: true,
      },
      orderBy: sort === "recent" ? { updatedAt: "desc" } : 
               sort === "availability" ? { availability: "desc" } : 
               { name: "asc" },
    })

    // 2. Parse and format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result = (users as any[]).map(user => ({
      id: user.id,
      name: user.name ?? 'Anonymous',
      image: user.image,
      headline: user.headline,
      bio: user.bio,
      semester: user.semester,
      department: user.department,
      roles: user.roles ? (JSON.parse(user.roles) as string[]) : [],
      skills: user.skills ? (JSON.parse(user.skills) as { name: string; level: number }[]) : [],
      interests: user.interests ? (JSON.parse(user.interests) as string[]) : [],
      socialLinks: user.socialLinks ? (JSON.parse(user.socialLinks) as Record<string, string>) : {},
      linkVisibility: user.linkVisibility ? (JSON.parse(user.linkVisibility) as Record<string, boolean>) : {},
      availability: user.availability ?? 0,
      isFounding: user.isFounding,
      githubData: user.githubData,
      updatedAt: user.updatedAt,
      matchScore: 0
    }))

    // 3. Manual Filters
    if (role) {
      result = result.filter(u => 
        u.roles.some((r: string) => r.toLowerCase() === role.toLowerCase())
      )
    }

    if (skill) {
      result = result.filter(u => 
        u.skills.some((s: { name: string }) => s.name.toLowerCase().includes(skill.toLowerCase()))
      )
    }

    // 4. Enhanced 'Best Match' logic
    if (sort === "best" && currentUserId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentUserData = await (prisma.user as any).findUnique({ where: { id: currentUserId } })
      if (currentUserData) {
        const myRoles = currentUserData.roles ? (JSON.parse(currentUserData.roles) as string[]) : []
        const myInterests = currentUserData.interests ? (JSON.parse(currentUserData.interests) as string[]) : []
        const myDept = currentUserData.department
        
        result.forEach(u => {
          let score = 0
          if (u.department === myDept) score += 5
          const sharedInterests = u.interests.filter(i => myInterests.includes(i)).length
          score += sharedInterests * 2
          u.roles.forEach(r => { if (!myRoles.includes(r)) score += 3 })
          score += (u.availability / 10)
          
          // Normalize Match Score (rough estimate)
          u.matchScore = Math.min(Math.round((score / 20) * 100), 99)
        })

        result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Discovery API Error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
