import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET /api/developers — list all developers
export async function GET() {
    const devs = await prisma.developer.findMany({
        orderBy: { createdAt: "desc" },
    })

    // Convert comma-separated skills string to array
    const result = devs.map((d) => ({
        id: d.id,
        name: d.name,
        semester: d.semester,
        department: d.department,
        role: d.role,
        skills: d.skills.split(",").map((s) => s.trim()).filter(Boolean),
        bio: d.bio,
    }))

    return NextResponse.json(result)
}

// POST /api/developers — create a developer
export async function POST(request: NextRequest) {
    const body = await request.json()
    const { name, semester, department, role, skills, bio } = body

    if (!name || !semester || !department || !role || !skills || !bio) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const dev = await prisma.developer.create({
        data: {
            name,
            semester: Number(semester),
            department,
            role,
            skills: Array.isArray(skills) ? skills.join(",") : skills,
            bio,
        },
    })

    return NextResponse.json({
        id: dev.id,
        name: dev.name,
        semester: dev.semester,
        department: dev.department,
        role: dev.role,
        skills: dev.skills.split(",").map((s) => s.trim()).filter(Boolean),
        bio: dev.bio,
    }, { status: 201 })
}
