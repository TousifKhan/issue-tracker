"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const rounter = useRouter();
  const [error, setError] = useState(false);
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 550 }}>
          <AlertDialog.Title>Delete Confirmation</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this Issue? This action can not be
            Undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="8" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  try {
                    setError(false);
                    await axios.delete(`/api/issues/${issueId}`);
                    rounter.push("/issues");
                    rounter.refresh();
                  } catch (error) {
                    setError(true);
                  }
                }}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content style={{ minWidth: 350 }}>
          <AlertDialog.Title>Error!</AlertDialog.Title>
          <AlertDialog.Description size="2">
            An error occurred in deleting Issue. Can not delete Issue now.
          </AlertDialog.Description>
          <Flex gap="3" mt="3" justify="end">
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="gray"
                onClick={() => setError(false)}
              >
                Ok
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
