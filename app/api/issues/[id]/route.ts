import { issueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 404 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id, 10),
    },
  });
  if (!issue) return NextResponse.json("Invalid Issue.", { status: 404 });

  const updatedIssue = prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id, 10),
    },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue." }, { status: 404 });

  await prisma.issue.delete({ where: { id: parseInt(params.id, 10) } });

  return NextResponse.json({}, { status: 200 });
}
