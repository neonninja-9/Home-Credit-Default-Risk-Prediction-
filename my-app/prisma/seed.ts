import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgrespassword@localhost:5433/creditlens_db?schema=public"

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding sample loan applications...")

  // Delete existing demo records if any
  await prisma.loanApplication.deleteMany({})

  const applications = [
    {
      loanId: "HC-849204",
      applicantName: "Eleanor Vance",
      age: 34,
      gender: "F",
      maritalStatus: "Married",
      education: "Higher education",
      employmentType: "Commercial associate",
      yearsEmployed: 7.5,
      children: 1,
      familyMembers: 3,
      annualIncome: 95000,
      loanAmount: 32000,
      loanAnnuity: 2400,
      goodsPrice: 32000,
      housingType: "House / apartment",
      ownCar: true,
      ownRealty: true,
      defaultProbability: 0.08,
      riskLevel: "Low",
      recommendation: "Approve",
      confidence: 0.94,
      status: "PENDING",
      bankRemarks: "Clean credit profile and strong income stability. Ready for officer sign-off.",
      shapValues: [
        { feature: "Debt-to-Income", value: 33.6, impact: "negative", desc: "Low DTI ratio (33.6%)" },
        { feature: "Employment Stability", value: 7.5, impact: "negative", desc: "7.5 years steady employment" },
        { feature: "Education", value: "Higher education", impact: "negative", desc: "Higher education qualification" },
        { feature: "Collateral", value: "Real Estate & Auto", impact: "negative", desc: "Dual asset backing" },
      ],
    },
    {
      loanId: "HC-334192",
      applicantName: "Marcus Thorne",
      age: 48,
      gender: "M",
      maritalStatus: "Single / not married",
      education: "Secondary / secondary special",
      employmentType: "Working",
      yearsEmployed: 2.1,
      children: 0,
      familyMembers: 1,
      annualIncome: 38000,
      loanAmount: 45000,
      loanAnnuity: 4100,
      goodsPrice: 45000,
      housingType: "Rented apartment",
      ownCar: false,
      ownRealty: false,
      defaultProbability: 0.68,
      riskLevel: "High",
      recommendation: "Reject",
      confidence: 0.91,
      status: "PENDING",
      bankRemarks: "High requested credit relative to annual earnings ($45k loan vs $38k income).",
      shapValues: [
        { feature: "Debt-to-Income", value: 118.4, impact: "positive", desc: "Debt exceeds annual income (118.4%)" },
        { feature: "Employment Stability", value: 2.1, impact: "positive", desc: "Short current tenure" },
        { feature: "Housing", value: "Rented apartment", impact: "positive", desc: "No permanent property registered" },
      ],
    },
    {
      loanId: "HC-992145",
      applicantName: "Sarah Chen",
      age: 29,
      gender: "F",
      maritalStatus: "Civil marriage",
      education: "Higher education",
      employmentType: "State servant",
      yearsEmployed: 4.0,
      children: 0,
      familyMembers: 2,
      annualIncome: 62000,
      loanAmount: 22000,
      loanAnnuity: 1850,
      goodsPrice: 22000,
      housingType: "House / apartment",
      ownCar: true,
      ownRealty: false,
      defaultProbability: 0.19,
      riskLevel: "Low",
      recommendation: "Approve",
      confidence: 0.88,
      status: "APPROVED",
      bankRemarks: "Approved by Senior Underwriter on standard tier.",
      reviewedBy: "Sarah Jenkins (Senior Underwriter)",
      reviewedAt: new Date(),
      shapValues: [
        { feature: "Employment Sector", value: "State servant", impact: "negative", desc: "Public sector stability" },
        { feature: "Debt-to-Income", value: 35.4, impact: "negative", desc: "Manageable monthly payment" },
      ],
    },
    {
      loanId: "HC-551082",
      applicantName: "David Miller",
      age: 41,
      gender: "M",
      maritalStatus: "Married",
      education: "Secondary / secondary special",
      employmentType: "Working",
      yearsEmployed: 3.5,
      children: 2,
      familyMembers: 4,
      annualIncome: 54000,
      loanAmount: 28000,
      loanAnnuity: 2900,
      goodsPrice: 28000,
      housingType: "House / apartment",
      ownCar: false,
      ownRealty: true,
      defaultProbability: 0.42,
      riskLevel: "Medium",
      recommendation: "Manual Review",
      confidence: 0.82,
      status: "PENDING",
      bankRemarks: "Requires income verification document upload before decision.",
      shapValues: [
        { feature: "Household Size", value: "4 members", impact: "positive", desc: "Moderate dependent count" },
        { feature: "Debt-to-Income", value: 51.8, impact: "positive", desc: "51.8% DTI near threshold" },
        { feature: "Collateral", value: "Real Estate Owner", impact: "negative", desc: "Home equity verified" },
      ],
    },
  ]

  for (const app of applications) {
    await prisma.loanApplication.create({
      data: app,
    })
  }

  console.log(`Successfully seeded ${applications.length} loan applications into PostgreSQL!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
