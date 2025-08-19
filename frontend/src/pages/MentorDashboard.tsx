import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Trophy, 
  FileText, 
  Plus,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
} from 'lucide-react';

const MentorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    assignedStudents: 45,
    activeChallenges: 3,
    openCases: 7,
    completedCases: 23,
    assignedGroups: 5,
  };

  const recentCases = [
    { 
      id: '1', 
      title: 'Academic Performance Issue', 
      student: 'John Smith', 
      priority: 'high', 
      status: 'open',
      dueDate: '2024-01-25'
    },
    { 
      id: '2', 
      title: 'Attendance Concern', 
      student: 'Sarah Johnson', 
      priority: 'medium', 
      status: 'in_progress',
      dueDate: '2024-01-28'
    },
    { 
      id: '3', 
      title: 'Personal Support Request', 
      student: 'Mike Wilson', 
      priority: 'low', 
      status: 'open',
      dueDate: '2024-01-30'
    },
  ];

  const assignedGroups = [
    { id: '1', name: 'Web Development Team A', students: 8, project: 'E-commerce Platform' },
    { id: '2', name: 'Mobile App Team B', students: 6, project: 'Fitness Tracker App' },
    { id: '3', name: 'Data Science Group C', students: 7, project: 'Market Analysis Tool' },
  ];

  const activeChallenges = [
    { 
      id: '1', 
      title: 'Algorithm Challenge Week', 
      participants: 12, 
      endDate: '2024-01-28',
      status: 'active'
    },
    { 
      id: '2', 
      title: 'UI/UX Design Contest', 
      participants: 8, 
      endDate: '2024-02-05',
      status: 'active'
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      default: return 'secondary';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignedStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across 3 departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeChallenges}</div>
            <p className="text-xs text-muted-foreground">
              20 total participants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openCases}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedCases} completed this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Groups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignedGroups}</div>
            <p className="text-xs text-muted-foreground">
              21 total students
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases & Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Cases</CardTitle>
            <CardDescription>Cases requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((caseItem) => (
                <div key={caseItem.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{caseItem.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Student: {caseItem.student}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(caseItem.priority)} className="text-xs">
                        {caseItem.priority}
                      </Badge>
                      <Badge variant={getStatusColor(caseItem.status)} className="text-xs">
                        {caseItem.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Due</p>
                    <p className="text-xs font-medium">{caseItem.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Groups</CardTitle>
            <CardDescription>Groups under your mentorship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedGroups.map((group) => (
                <div key={group.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{group.name}</p>
                    <Badge variant="secondary">{group.students} students</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Project: {group.project}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const actions = (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <MessageSquare className="mr-2 h-4 w-4" />
        Send Message
      </Button>
      <Button size="sm">
        <Plus className="mr-2 h-4 w-4" />
        Create Challenge
      </Button>
    </div>
  );

  return (
    <DashboardLayout
      title="Mentor Dashboard"
      subtitle="Guide and support your students"
      actions={actions}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Profiles</CardTitle>
              <CardDescription>
                View and manage your assigned students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Student profile management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active Challenges</CardTitle>
                  <CardDescription>
                    Challenges you've created for students
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Challenge
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeChallenges.map((challenge) => (
                    <div key={challenge.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{challenge.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {challenge.participants} participants • Ends {challenge.endDate}
                        </p>
                      </div>
                      <Badge variant="default">{challenge.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cases" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Case Management</CardTitle>
                <CardDescription>
                  Manage student cases and support requests
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Case
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((caseItem) => (
                  <div key={caseItem.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{caseItem.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Student: {caseItem.student}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(caseItem.priority)}>
                          {caseItem.priority}
                        </Badge>
                        <Badge variant={getStatusColor(caseItem.status)}>
                          {caseItem.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Due: {caseItem.dueDate}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Group Management</CardTitle>
              <CardDescription>
                Manage your assigned student groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedGroups.map((group) => (
                  <div key={group.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{group.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Project: {group.project}
                        </p>
                      </div>
                      <Badge variant="secondary">{group.students} students</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Group
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        View Members
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default MentorDashboard;