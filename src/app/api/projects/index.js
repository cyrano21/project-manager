import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const projects = await prisma.project.findMany({
        include: {
          team: true,
          client: true,
          tags: {
            include: {
              tag: true,
            },
          },
          assignees: true,
          user: true,
        },
      });
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  } else if (req.method === 'POST') {
    try {
      const project = await prisma.project.create({
        data: req.body,
      });
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create project' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
