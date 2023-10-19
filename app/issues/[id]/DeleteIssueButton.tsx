import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <div>
      <Button color="red">
        <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
      </Button>
    </div>
  );
};

export default DeleteIssueButton;
