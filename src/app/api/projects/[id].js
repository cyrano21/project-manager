import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          assignees: true,
          tasks: true,
          tags: {
            include: {
              tag: true
            }
          }
        }
      });
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    } else if (req.method === 'PUT') {
      const { name, status, image } = req.body;
      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          name,
          status,
          image,
        },
      });
      res.status(200).json(updatedProject);
    } else if (req.method === 'DELETE') {
      await prisma.project.delete({
        where: { id },
      });
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
