"use client";

import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
  Mail,
  Phone,
  PenSquare,
  Trash2,
  Plus,
  Search
} from 'lucide-react';
import { Input } from '../ui/input';
import { AddTeamMemberModal } from './AddTeamMemberModal';
import { useToast } from '../ui/use-toast';

export function TeamList() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetch('/api/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error('Error loading team members:', err);
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load team members"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, [toast]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteMember = async (id) => {
    try {
      const response = await fetch(`/api/team?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete team member');
      }

      setMembers(prev => prev.filter(member => member.id !== id));
      toast({
        title: "Success",
        description: "Team member deleted successfully"
      });
    } catch (err) {
      console.error('Error deleting team member:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete team member"
      });
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        <Button
          onClick={() => {
            setSelectedMember(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <Badge variant={member.status === 'ACTIVE' ? 'success' : 'secondary'}>
                  {member.status}
                </Badge>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  {member.email}
                </div>
                {member.phone && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    {member.phone}
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedMember(member);
                    setIsModalOpen(true);
                  }}
                >
                  <PenSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AddTeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedMember}
        onSuccess={() => {
          setIsModalOpen(false);
          loadMembers();
        }}
      />
    </div>
  );
}