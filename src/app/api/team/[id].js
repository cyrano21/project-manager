import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Member ID is required' })
  }

  if (req.method === 'GET') {
    try {
      const member = await prisma.teamMember.findUnique({
        where: { id }
      })
      
      if (!member) {
        return res.status(404).json({ error: 'Team member not found' })
      }
      
      res.status(200).json(member)
    } catch (error) {
      console.error('Error fetching team member:', error)
      res.status(500).json({ error: 'Failed to fetch team member' })
    }
  }
  else if (req.method === 'PUT') {
    try {
      const { name, role, email, phone, avatar, status } = req.body
      
      // Validation basique
      if (!name || !role || !email) {
        return res.status(400).json({ error: 'Name, role and email are required' })
      }

      const member = await prisma.teamMember.update({
        where: { id },
        data: {
          name,
          role,
          email,
          phone,
          avatar,
          status
        }
      })
      
      res.status(200).json(member)
    } catch (error) {
      console.error('Error updating team member:', error)
      res.status(500).json({ error: 'Failed to update team member' })
    }
  }
  else if (req.method === 'DELETE') {
    try {
      await prisma.teamMember.delete({
        where: { id }
      })
      
      res.status(204).end()
    } catch (error) {
      console.error('Error deleting team member:', error)
      res.status(500).json({ error: 'Failed to delete team member' })
    }
  }
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}