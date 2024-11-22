import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useToast } from '../ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  Bell,
  Mail,
  Users,
  Shield,
  Sliders,
  Link,
  Globe,
  Moon,
  Sun,
  Building,
} from 'lucide-react'

export function WorkspaceSettings() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState({
    email: false,
    push: false,
    weekly: false
  })
  const [theme, setTheme] = useState('light')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState(null)
  const [error, setError] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [isLoadingTeam, setIsLoadingTeam] = useState(true)
  const [teamError, setTeamError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : ''

  // Fonction de recherche des membres
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Filtrer les membres en fonction de la recherche
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Gérer l'ajout d'un membre
  const handleAddMember = () => {
    setSelectedMember(null)
    setShowAddMemberModal(true)
  }

  // Gérer l'édition d'un membre
  const handleEditMember = (member) => {
    setSelectedMember(member)
    setShowAddMemberModal(true)
  }


  // Gérer la connexion aux services
  const handleConnect = async (service) => {
    try {
      toast({
        title: "Connecting...",
        description: `Initiating connection to ${service}`
      })

      // Simuler une connexion (à remplacer par la vraie implémentation)
      await new Promise(resolve => setTimeout(resolve, 1500))

      toast({
        title: "Success",
        description: `Successfully connected to ${service}`
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to connect to ${service}`
      })
    }
  }

  useEffect(() => {
    fetchSettings()
    fetchTeamMembers()
  }, [])

  const fetchSettings = async () => {
    try {
      const savedSettings = localStorage.getItem('settings');
      const parsedSettings = savedSettings ? JSON.parse(savedSettings) : {
        notifications: {
          email: false,
          push: false,
          weekly: false
        },
        theme: 'light',
        companyName: '',
        companyEmail: '',
        companyPhone: '',
        address: '',
        city: '',
        country: '',
        currency: '',
        taxNumber: ''
      };
      
      setSettings(parsedSettings);
      setTheme(parsedSettings.theme || 'light');
      setNotifications(parsedSettings.notifications || {
        email: false,
        push: false,
        weekly: false
      });
    } catch (err) {
      console.error('Error loading settings:', err);
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load settings"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleNotificationChange = (type) => {
    try {
      const newNotifications = {
        ...notifications,
        [type]: !notifications[type]
      };
      setNotifications(newNotifications);

      const updatedSettings = {
        ...settings,
        notifications: newNotifications
      };
      
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
      setSettings(updatedSettings);

      toast({
        title: "Success",
        description: "Notification settings updated"
      });
    } catch (err) {
      setNotifications(prev => ({
        ...prev,
        [type]: !prev[type]
      }));
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notification settings"
      });
    }
  }

  const handleThemeChange = (newTheme) => {
    try {
      setTheme(newTheme);

      const updatedSettings = {
        ...settings,
        theme: newTheme
      };
      
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
      setSettings(updatedSettings);

      toast({
        title: "Success",
        description: "Theme updated successfully"
      });
    } catch (err) {
      setTheme(theme);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update theme"
      });
    }
  }

  const saveSettings = () => {
    setIsSaving(true);
    setError(null);

    try {
      localStorage.setItem('settings', JSON.stringify(settings));
      
      toast({
        title: "Success",
        description: "Settings saved successfully"
      });
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message
      });
    } finally {
      setIsSaving(false);
    }
  }

  const fetchTeamMembers = async () => {
    try {
      const savedMembers = localStorage.getItem('teamMembers');
      const parsedMembers = savedMembers ? JSON.parse(savedMembers) : [];
      setTeamMembers(parsedMembers);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setTeamError(err.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load team members"
      });
    } finally {
      setIsLoadingTeam(false);
    }
  }

  const handleStatusChange = async (memberId, newStatus) => {
    try {
      const updatedMembers = teamMembers.map(member => 
        member.id === memberId ? { ...member, status: newStatus } : member
      );
      
      localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
      setTeamMembers(updatedMembers);

      toast({
        title: "Success",
        description: "Member status updated successfully"
      });
    } catch (err) {
      console.error('Error updating member status:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update member status"
      });
    }
  }

  const handleSubmitMember = async (data) => {
    try {
      let updatedMembers = [...teamMembers];
      
      if (selectedMember) {
        // Édition d'un membre existant
        updatedMembers = updatedMembers.map(member => 
          member.id === selectedMember.id ? { ...member, ...data } : member
        );
      } else {
        // Ajout d'un nouveau membre
        updatedMembers.push({
          id: Date.now().toString(),
          ...data
        });
      }
      
      localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
      setTeamMembers(updatedMembers);
      
      toast({
        title: "Success",
        description: selectedMember ? "Member updated successfully" : "Member added successfully"
      });
      
      setShowAddMemberModal(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to save member"
      });
    }
  }


  useEffect(() => {
    fetchSettings()
  }, [])


  const handleSettingsChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

 

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Workspace Settings</h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5" />
                Notifications
              </h2>
              <div className="space-y-4">
                {[
                  {
                    id: 'email',
                    title: 'Email Notifications',
                    description: 'Receive email updates about your account',
                    icon: <Mail className="h-4 w-4" />,
                  },
                  {
                    id: 'push',
                    title: 'Push Notifications',
                    description: 'Receive push notifications about your account',
                    icon: <Bell className="h-4 w-4" />,
                  },
                  {
                    id: 'updates',
                    title: 'Product Updates',
                    description: 'Receive updates about new features and improvements',
                    icon: <Globe className="h-4 w-4" />,
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <div>
                        <Label>{item.title}</Label>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications[item.id]}
                      onCheckedChange={() => handleNotificationChange(item.id)}
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Appearance */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Sun className="h-5 w-5" />
                Appearance
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-gray-500">
                      Select your preferred theme
                    </p>
                  </div>
                  <select
                    className="border rounded-md px-2 py-1"
                    value={theme}
                    onChange={(e) => handleThemeChange(e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Building className="h-5 w-5" />
                Company Information
              </h2>
              {isLoading ? (
                <div>Loading company settings...</div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input
                        name="companyName"
                        value={settings?.companyName || ''}
                        onChange={handleSettingsChange}
                        placeholder="Enter company name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Email</Label>
                      <Input
                        name="companyEmail"
                        type="email"
                        value={settings?.companyEmail || ''}
                        onChange={handleSettingsChange}
                        placeholder="Enter company email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Phone</Label>
                      <Input
                        name="companyPhone"
                        value={settings?.companyPhone || ''}
                        onChange={handleSettingsChange}
                        placeholder="Enter company phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Input
                        name="address"
                        value={settings?.address || ''}
                        onChange={handleSettingsChange}
                        placeholder="Enter address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        name="city"
                        value={settings?.city || ''}
                        onChange={handleSettingsChange}
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input
                        name="country"
                        value={settings?.country || ''}
                        onChange={handleSettingsChange}
                        placeholder="Enter country"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Input
                        name="currency"
                        value={settings?.currency || ''}
                        onChange={handleSettingsChange}
                        placeholder="Enter currency (e.g., USD)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tax Number</Label>
                      <Input
                        name="taxNumber"
                        value={settings?.taxNumber || ''}
                        onChange={handleSettingsChange}
                        placeholder="Enter tax number"
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                      {error}
                    </div>
                  )}

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={saveSettings}
                      disabled={isSaving}
                      className={isSaving ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      {isSaving ? 'Saving...' : 'Save Company Settings'}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="space-y-6">
            {/* Team Members */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Users className="h-5 w-5" />
                Team Members
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Input
                    placeholder="Search members..."
                    className="max-w-xs"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <Button onClick={handleAddMember}>
                    <Users className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>

                {isLoadingTeam ? (
                  <div>Loading team members...</div>
                ) : teamError ? (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                    {teamError}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            {member.name ? member.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <select
                            className="border rounded-md px-2 py-1"
                            value={member.status}
                            onChange={(e) => handleStatusChange(member.id, e.target.value)}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                          </select>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditMember(member)}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Link className="h-5 w-5" />
                Connected Services
              </h2>
              <div className="space-y-6">
                {[
                  {
                    name: 'GitHub',
                    description: 'Connect your GitHub repositories',
                    icon: (
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                          <path d="M21.75 5.25H18.75V3.75C18.75 3.33579 18.4142 3 18 3C17.5858 3 17.25 3.33579 17.25 3.75V5.25H6.75V3.75C6.75 3.33579 6.41421 3 6 3C5.58579 3 5.25 3.33579 5.25 3.75V5.25H2.25C1.42157 5.25 0.75 5.92157 0.75 6.75V20.25C0.75 21.0784 1.42157 21.75 2.25 21.75H21.75C22.5784 21.75 23.25 21.0784 23.25 20.25V6.75C23.25 5.92157 22.5784 5.25 21.75 5.25ZM2.25 20.25V9H21.75V20.25H2.25Z" />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    name: 'Slack',
                    description: 'Get notifications in Slack',
                    icon: (
                      <div className="w-10 h-10 bg-[#4A154B] rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                        </svg>
                      </div>
                    ),
                  },
                  {
                    name: 'Google Calendar',
                    description: 'Sync your calendar events',
                    icon: (
                      <div className="w-10 h-10 bg-white border rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                          <path d="M21.75 5.25H18.75V3.75C18.75 3.33579 18.4142 3 18 3C17.5858 3 17.25 3.33579 17.25 3.75V5.25H6.75V3.75C6.75 3.33579 6.41421 3 6 3C5.58579 3 5.25 3.33579 5.25 3.75V5.25H2.25C1.42157 5.25 0.75 5.92157 0.75 6.75V20.25C0.75 21.0784 1.42157 21.75 2.25 21.75H21.75C22.5784 21.75 23.25 21.0784 23.25 20.25V6.75C23.25 5.92157 22.5784 5.25 21.75 5.25ZM2.25 20.25V9H21.75V20.25H2.25Z" />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    name: 'Jira',
                    description: 'Link your Jira projects',
                    icon: (
                      <div className="w-10 h-10 bg-[#0052CC] rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                          <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.019 0H11.461a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.005 1.005 0 0 0 23.019 0z" />
                        </svg>
                      </div>
                    ),
                  },
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {service.icon}
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => handleConnect(service.name)}
                    >
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
        {/* Modal d'ajout/édition de membre */}
        {showAddMemberModal && (
        <Dialog open={showAddMemberModal} onOpenChange={setShowAddMemberModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedMember ? 'Edit Member' : 'Add New Member'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleSubmitMember({
                name: formData.get('name'),
                email: formData.get('email'),
                role: formData.get('role'),
                status: formData.get('status')
              })
            }}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={selectedMember?.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={selectedMember?.email}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" defaultValue={selectedMember?.role || 'member'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={selectedMember?.status || 'active'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddMemberModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedMember ? 'Save Changes' : 'Add Member'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}