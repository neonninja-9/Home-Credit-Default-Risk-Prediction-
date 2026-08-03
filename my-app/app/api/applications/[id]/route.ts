import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"

// GET /api/applications/[id] - Fetch single application
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const application = await prisma.loanApplication.findFirst({
      where: {
        OR: [{ id }, { loanId: id }],
      },
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// PATCH /api/applications/[id] - Update status and remarks by Bank Officer
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params
    const body = await req.json()
    const { status, bankRemarks } = body

    if (!status || !["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be APPROVED, REJECTED, or PENDING." },
        { status: 400 }
      )
    }

    const application = await prisma.loanApplication.findFirst({
      where: {
        OR: [{ id }, { loanId: id }],
      },
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    const updated = await prisma.loanApplication.update({
      where: { id: application.id },
      data: {
        status,
        bankRemarks: bankRemarks !== undefined ? bankRemarks : application.bankRemarks,
        reviewedBy: session?.user?.name || "Bank Underwriting Officer",
        reviewedAt: new Date(),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
