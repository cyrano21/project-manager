import { useState, useEffect } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import {
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Search,
  Plus,
} from 'lucide-react'
import { Input } from '../ui/input'
import { AddTeamMemberModal } from './AddTeamMemberModal'

export function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const loadMembers = async () => {
    try {
      const response = await fetch('/api/team')
      if (!response.ok) {
        throw new Error('Failed to fetch team members')
      }
      const data = await response.json()
      setMembers(data)
    } catch (err) {
      console.error('Error loading team members:', err)
      setError('Failed to load team members')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMembers()
  }, [])

  const handleAddMember = () => {
    setSelectedMember(null)
    setIsModalOpen(true)
  }

  const handleEditMember = (member) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedMember(null)
  }

  const handleModalSuccess = () => {
    loadMembers()
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <Input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={handleAddMember}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleEditMember(member)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="mr-2 h-4 w-4" />
                {member.email}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="mr-2 h-4 w-4" />
                {member.phone}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(member.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="secondary" className="mr-2">
                {member.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <AddTeamMemberModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        member={selectedMember}
        onSuccess={handleModalSuccess}
      />
    </div>
  )
}