import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"

// GET /api/applications - List & Search applications for Bank Officers
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const riskLevel = searchParams.get("riskLevel") || ""

    const whereClause: any = {}

    if (search) {
      whereClause.OR = [
        { loanId: { contains: search, mode: "insensitive" } },
        { applicantName: { contains: search, mode: "insensitive" } },
      ]
    }

    if (status && status !== "ALL") {
      whereClause.status = status
    }

    if (riskLevel && riskLevel !== "ALL") {
      whereClause.riskLevel = riskLevel
    }

    const applications = await prisma.loanApplication.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: 50,
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Failed to fetch applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

// POST /api/applications - Submit new application (from Customer or Bank intake)
export async function POST(req: Request) {
  try {
    const session = await auth()
    const body = await req.json()

    const {
      applicantName,
      age,
      gender,
      maritalStatus,
      education,
      employmentType,
      yearsEmployed,
      children,
      familyMembers,
      annualIncome,
      loanAmount,
      loanAnnuity,
      goodsPrice,
      housingType,
      ownCar,
      ownRealty,
      defaultProbability,
      riskLevel,
      recommendation,
      confidence,
      shapValues,
    } = body

    if (!applicantName || !loanAmount || !annualIncome) {
      return NextResponse.json(
        { error: "Missing required application fields" },
        { status: 400 }
      )
    }

    // Generate unique loan identifier
    const loanId = `HC-${Math.floor(100000 + Math.random() * 900000)}`

    // Determine risk and recommendation if not already provided
    const prob = Number(defaultProbability) || 0.15
    const computedRisk =
      riskLevel || (prob < 0.3 ? "Low" : prob <= 0.6 ? "Medium" : "High")
    const computedRec =
      recommendation ||
      (prob < 0.3 ? "Approve" : prob <= 0.6 ? "Manual Review" : "Reject")

    const newApplication = await prisma.loanApplication.create({
      data: {
        loanId,
        userId: session?.user?.id || null,
        applicantName: String(applicantName),
        age: Number(age) || 35,
        gender: String(gender || "M"),
        maritalStatus: String(maritalStatus || "Married"),
        education: String(education || "Higher education"),
        employmentType: String(employmentType || "Commercial associate"),
        yearsEmployed: Number(yearsEmployed) || 5,
        children: Number(children) || 0,
        familyMembers: Number(familyMembers) || 2,
        annualIncome: Number(annualIncome),
        loanAmount: Number(loanAmount),
        loanAnnuity: Number(loanAnnuity) || Math.round(Number(loanAmount) * 0.08),
        goodsPrice: Number(goodsPrice) || Number(loanAmount),
        housingType: String(housingType || "House / apartment"),
        ownCar: Boolean(ownCar),
        ownRealty: Boolean(ownRealty),
        defaultProbability: prob,
        riskLevel: computedRisk,
        recommendation: computedRec,
        confidence: Number(confidence) || 0.88,
        shapValues: shapValues || null,
        status: "PENDING",
      },
    })

    return NextResponse.json(newApplication, { status: 201 })
  } catch (error) {
    console.error("Failed to create application:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
