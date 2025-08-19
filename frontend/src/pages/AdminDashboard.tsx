import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  Building, 
  UserPlus,
  Download,
  Upload,
  BarChart3,
  Calendar,
  Trophy,
  AlertCircle,
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalStudents: 1245,
    totalMentors: 89,
    activeBatches: 12,
    totalDepartments: 8,
    pendingCases: 23,
    activeChallenges: 5,
  };

  const recentBatches = [
    { id: '1', name: 'Fall 2024 - Engineering', students: 156, status: 'active' },
    { id: '2', name: 'Fall 2024 - Business', students: 134, status: 'active' },
    { id: '3', name: 'Summer 2024 - Design', students: 98, status: 'completed' },
  ];

  const recentActivity = [
    { id: '1', action: 'New batch created', user: 'John Admin', time: '2 hours ago' },
    { id: '2', action: 'Student bulk upload completed', user: 'Sarah Wilson', time: '4 hours ago' },
    { id: '3', action: 'Department capacity updated', user: 'John Admin', time: '1 day ago' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMentors}</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBatches}</div>
            <p className="text-xs text-muted-foreground">
              2 starting next month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDepartments}</div>
            <p className="text-xs text-muted-foreground">
              All departments active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingCases}</div>
            <p className="text-xs text-muted-foreground">
              -5 from yesterday
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
              245 total participants
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Batches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Batches</CardTitle>
            <CardDescription>Latest batch information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{batch.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {batch.students} students
                    </p>
                  </div>
                  <Badge variant={batch.status === 'active' ? 'default' : 'secondary'}>
                    {batch.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>System activity log</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    by {activity.user} • {activity.time}
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
        <Download className="mr-2 h-4 w-4" />
        Export Data
      </Button>
      <Button size="sm">
        <UserPlus className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>
  );

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage your institution's operations"
      actions={actions}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  Manage student accounts, enrollment, and profiles
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Bulk Upload
                </Button>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Student management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mentor Management</CardTitle>
              <CardDescription>
                Manage mentor accounts and assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mentor management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batches" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Management</CardTitle>
              <CardDescription>
                Create and manage student batches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Batch management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>
                Manage academic departments and capacity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Department management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Management</CardTitle>
              <CardDescription>
                Create and monitor student challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Challenge management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;