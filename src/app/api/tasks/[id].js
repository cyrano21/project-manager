import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      // Si le paramètre projectId est présent dans la query string, on récupère les tâches du projet
      const { projectId } = req.query;
      if (projectId) {
        const tasks = await prisma.task.findMany({
          where: { projectId },
          orderBy: { dueDateTime: 'asc' }
        });
        return res.status(200).json(tasks);
      }

      // Sinon, on récupère une tâche spécifique
      const task = await prisma.task.findUnique({
        where: { id }
      });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json(task);
    } else if (req.method === 'PUT') {
      const { title, status, dueDateTime, reminder } = req.body;

      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          title,
          status,
          dueDateTime: dueDateTime ? new Date(dueDateTime) : null,
          reminder: reminder ? new Date(reminder) : null
        }
      });

      res.status(200).json(updatedTask);
    } else if (req.method === 'DELETE') {
      await prisma.task.delete({
        where: { id }
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
