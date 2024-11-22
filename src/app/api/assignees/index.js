import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const assignees = await prisma.assignee.findMany();
      res.status(200).json(assignees);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch assignees' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
