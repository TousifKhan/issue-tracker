import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id, 10)
        }
    })

    if (!issue) 
        notFound();

  return (
    <div>
        <Grid columns='2'>
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex className='space-x-3' my='3'>
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='mt-5'>
                    <ReactMarkdown className='prose'>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        
        </Grid>
    </div>
  )
}

export default IssueDetailPage