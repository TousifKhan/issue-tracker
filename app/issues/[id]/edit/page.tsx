import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  console.log(params.id);
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id, 10),
    },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
