import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'
import IssueActions from './IssueActions'
import Link from '../components/Link'

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();

  await delay(500); //half second delay

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell><Link href={`/issues/${issue.id}`}>{issue.title}</Link></Table.Cell>
              <Table.Cell><IssueStatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        </Table.Root>
    </div>
  )
}

export default IssuePage