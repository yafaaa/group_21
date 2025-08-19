import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Trophy, 
  BookOpen, 
  Calendar,
  MessageSquare,
  User,
  Edit,
  Clock,
  Target,
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const studentInfo = {
    id: 'STU-2024-001',
    batch: 'Fall 2024 - Computer Science',
    department: 'Software Engineering',
    group: 'Web Development Team A',
    enrollmentDate: '2024-08-15',
    mentor: 'Dr. Sarah Wilson',
  };

  const stats = {
    challengesJoined: 5,
    challengesCompleted: 3,
    groupMembers: 7,
    coursesCompleted: 12,
  };

  const activeChallenges = [
    { 
      id: '1', 
      title: 'Algorithm Challenge Week', 
      progress: 75,
      endDate: '2024-01-28',
      status: 'active',
      description: 'Solve 5 algorithm problems this week'
    },
    { 
      id: '2', 
      title: 'UI/UX Design Contest', 
      progress: 30,
      endDate: '2024-02-05',
      status: 'active',
      description: 'Design a mobile app interface'
    },
  ];

  const groupMembers = [
    { id: '1', name: 'Alice Johnson', role: 'Frontend Developer', avatar: 'AJ' },
    { id: '2', name: 'Bob Smith', role: 'Backend Developer', avatar: 'BS' },
    { id: '3', name: 'Carol Davis', role: 'Designer', avatar: 'CD' },
    { id: '4', name: 'David Wilson', role: 'Project Manager', avatar: 'DW' },
  ];

  const recentActivity = [
    { id: '1', action: 'Joined Algorithm Challenge Week', time: '2 hours ago' },
    { id: '2', action: 'Completed React Fundamentals course', time: '1 day ago' },
    { id: '3', action: 'Added to Web Development Team A', time: '3 days ago' },
  ];

  const upcomingDeadlines = [
    { id: '1', title: 'Algorithm Challenge Submission', date: '2024-01-28', type: 'challenge' },
    { id: '2', title: 'Project Milestone Review', date: '2024-01-30', type: 'project' },
    { id: '3', title: 'UI/UX Contest Entry', date: '2024-02-05', type: 'challenge' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Student Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>Student profile and enrollment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Student ID</p>
              <p className="font-mono">{studentInfo.id}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Batch</p>
              <p>{studentInfo.batch}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Department</p>
              <p>{studentInfo.department}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Mentor</p>
              <p>{studentInfo.mentor}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Group</p>
              <p>{studentInfo.group}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Enrollment Date</p>
              <p>{new Date(studentInfo.enrollmentDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Challenges Joined</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.challengesJoined}</div>
            <p className="text-xs text-muted-foreground">
              {stats.challengesCompleted} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Group Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.groupMembers}</div>
            <p className="text-xs text-muted-foreground">
              Including you
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coursesCompleted}</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
            <p className="text-xs text-muted-foreground">
              Next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Challenges</CardTitle>
            <CardDescription>Your ongoing challenges and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeChallenges.map((challenge) => (
                <div key={challenge.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{challenge.title}</p>
                    <Badge variant="default">{challenge.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {challenge.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ends: {challenge.endDate}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent achievements and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
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
        <Edit className="mr-2 h-4 w-4" />
        Edit Profile
      </Button>
      <Button size="sm">
        <Target className="mr-2 h-4 w-4" />
        Join Challenge
      </Button>
    </div>
  );

  return (
    <DashboardLayout
      title="Student Dashboard"
      subtitle="Track your progress and stay connected"
      actions={actions}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="group">My Group</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="group" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Group: {studentInfo.group}</CardTitle>
                  <CardDescription>
                    Collaborate with your team members
                  </CardDescription>
                </div>
                <Button size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Group Chat
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Group Members</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {groupMembers.map((member) => (
                        <div key={member.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-medium">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Current Project</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-medium">E-commerce Platform</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Building a full-stack e-commerce application with React and Node.js
                      </p>
                      <div className="mt-3">
                        <Progress value={65} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">65% Complete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Available Challenges</CardTitle>
                  <CardDescription>
                    Join challenges to test your skills and compete
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Trophy className="mr-2 h-4 w-4" />
                  Browse All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium">{challenge.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {challenge.description}
                          </p>
                        </div>
                        <Badge variant={challenge.status === 'active' ? 'default' : 'secondary'}>
                          {challenge.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Your Progress</span>
                          <span>{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Ends: {challenge.endDate}
                        </span>
                        <Button variant="outline" size="sm">
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Don't miss these important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{deadline.title}</p>
                          <p className="text-xs text-muted-foreground">{deadline.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{deadline.date}</p>
                        <p className="text-xs text-muted-foreground">Due date</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Management</CardTitle>
              <CardDescription>
                Update your personal information and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Profile management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StudentDashboard;