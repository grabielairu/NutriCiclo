import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import connectMongoose from "@/libs/mongoose";
import CycleData from "@/models/CycleData";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await connectMongoose();
  const data = await CycleData.findOne({ userId: session.user.id });

  return NextResponse.json({ data });
}

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const { name, age, cycleLength, periodDuration, lastPeriodStart, lastPeriodEnd, ovulationDay, region } = body;

  if (!name || !age || !lastPeriodStart) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  await connectMongoose();
  const data = await CycleData.findOneAndUpdate(
    { userId: session.user.id },
    {
      name, age, cycleLength, periodDuration, lastPeriodStart,
      ...(region && { region }),
      ...(lastPeriodEnd !== undefined && { lastPeriodEnd }),
      ...(ovulationDay !== undefined && { ovulationDay }),
    },
    { upsert: true, new: true }
  );

  return NextResponse.json({ data });
}
