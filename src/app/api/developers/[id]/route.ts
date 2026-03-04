import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// DELETE /api/developers/[id]
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        await prisma.developer.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Developer not found" }, { status: 404 })
    }
}
