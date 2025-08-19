import React, { useState } from 'react';
import { Upload, Users, BookOpen, Settings, BarChart3, Filter, Search, Plus, Edit, Trash2, Download, Eye, Send, UserPlus } from 'lucide-react';

// Type definitions
interface Student {
  id: string;
  name: string;
  email: string;
  batchId: string;
  mentorId?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

interface Batch {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  mentorIds: string[];
  department: string;
  building: string;
}

interface Mentor {
  id: string;
  name: string;
  email: string;
  expertise: string[];
  assignedBatches: string[];
}

interface Group {
  id: string;
  name: string;
  batchId: string;
  studentIds: string[];
  project: string;
  mentorId?: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
}

interface Building {
  id: string;
  name: string;
  blockNumber: string;
  totalRooms: number;
  roomCapacity: number;
  batchId: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [showAddMentorModal, setShowAddMentorModal] = useState(false);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [showAddBuildingModal, setShowAddBuildingModal] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // Mock data for demonstration
  React.useEffect(() => {
    // Mock batches
    setBatches([
      {
        id: 'batch1',
        name: 'Fall 2023',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-12-15'),
        mentorIds: ['mentor1', 'mentor2'],
        department: 'Computer Science',
        building: 'Building A'
      },
      {
        id: 'batch2',
        name: 'Spring 2024',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-30'),
        mentorIds: ['mentor2'],
        department: 'Information Technology',
        building: 'Building B'
      }
    ]);

    // Mock mentors
    setMentors([
      {
        id: 'mentor1',
        name: 'Dr. Sarah Johnson',
        email: 'sarah@example.com',
        expertise: ['Web Development', 'Database Systems'],
        assignedBatches: ['batch1']
      },
      {
        id: 'mentor2',
        name: 'Prof. Michael Chen',
        email: 'michael@example.com',
        expertise: ['AI', 'Machine Learning'],
        assignedBatches: ['batch1', 'batch2']
      }
    ]);

    // Mock students
    setStudents([
      {
        id: 'student1',
        name: 'John Doe',
        email: 'john@example.com',
        batchId: 'batch1',
        mentorId: 'mentor1',
        status: 'active',
        createdAt: new Date('2023-08-15')
      },
      {
        id: 'student2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        batchId: 'batch1',
        mentorId: 'mentor1',
        status: 'active',
        createdAt: new Date('2023-08-16')
      },
      {
        id: 'student3',
        name: 'Robert Brown',
        email: 'robert@example.com',
        batchId: 'batch2',
        mentorId: 'mentor2',
        status: 'active',
        createdAt: new Date('2024-01-05')
      }
    ]);

    // Mock groups
    setGroups([
      {
        id: 'group1',
        name: 'Web Innovators',
        batchId: 'batch1',
        studentIds: ['student1', 'student2'],
        project: 'E-commerce Platform',
        mentorId: 'mentor1'
      }
    ]);

    // Mock departments
    setDepartments([
      {
        id: 'dept1',
        name: 'Computer Science',
        description: 'Department of Computer Science and Engineering'
      },
      {
        id: 'dept2',
        name: 'Information Technology',
        description: 'Department of Information Technology'
      }
    ]);

    // Mock buildings
    setBuildings([
      {
        id: 'bld1',
        name: 'Building A',
        blockNumber: 'A',
        totalRooms: 20,
        roomCapacity: 30,
        batchId: 'batch1'
      },
      {
        id: 'bld2',
        name: 'Building B',
        blockNumber: 'B',
        totalRooms: 15,
        roomCapacity: 25,
        batchId: 'batch2'
      }
    ]);
  }, []);

  // Handle CSV file upload
  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      setCsvFile(file);
      // Here you would process the CSV file and create student accounts
      alert(`File "${file.name}" uploaded successfully. Process to create accounts.`);
    } else {
      alert('Please upload a valid CSV or Excel file.');
    }
  };

  // Process CSV and create student accounts
  const processCsv = () => {
    if (!csvFile) return;
    
    // In a real application, you would parse the CSV and create accounts
    // This is just a mock implementation
    const mockStudentsFromCsv: Student[] = [
      { 
        id: '4', 
        name: 'Alice Johnson', 
        email: 'alice@example.com', 
        batchId: 'batch1', 
        status: 'active',
        createdAt: new Date() 
      },
      { 
        id: '5', 
        name: 'David Wilson', 
        email: 'david@example.com', 
        batchId: 'batch1', 
        status: 'active',
        createdAt: new Date() 
      },
    ];
    
    setStudents([...students, ...mockStudentsFromCsv]);
    setCsvFile(null);
    alert('Student accounts created successfully!');
  };

  // Add a new student manually
  const addStudent = (student: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...student,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setStudents([...students, newStudent]);
    setShowAddStudentModal(false);
  };

  // Add a new batch
  const addBatch = (batch: Omit<Batch, 'id'>) => {
    const newBatch: Batch = {
      ...batch,
      id: Math.random().toString(36).substr(2, 9),
    };
    setBatches([...batches, newBatch]);
    setShowAddBatchModal(false);
  };

  // Add a new mentor
  const addMentor = (mentor: Omit<Mentor, 'id'>) => {
    const newMentor: Mentor = {
      ...mentor,
      id: Math.random().toString(36).substr(2, 9),
    };
    setMentors([...mentors, newMentor]);
    setShowAddMentorModal(false);
  };

  // Add a new department
  const addDepartment = (department: Omit<Department, 'id'>) => {
    const newDepartment: Department = {
      ...department,
      id: Math.random().toString(36).substr(2, 9),
    };
    setDepartments([...departments, newDepartment]);
    setShowAddDepartmentModal(false);
  };

  // Add a new building
  const addBuilding = (building: Omit<Building, 'id'>) => {
    const newBuilding: Building = {
      ...building,
      id: Math.random().toString(36).substr(2, 9),
    };
    setBuildings([...buildings, newBuilding]);
    setShowAddBuildingModal(false);
  };

  // Filter students by batch
  const filteredStudents = selectedBatch === 'all' 
    ? students 
    : students.filter(student => student.batchId === selectedBatch);

  // Filter groups by batch
  const filteredGroups = selectedBatch === 'all'
    ? groups
    : groups.filter(group => group.batchId === selectedBatch);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>Admin Panel</span>
        </div>
        <nav className="nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <Users size={20} />
            <span>Students</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'batches' ? 'active' : ''}`}
            onClick={() => setActiveTab('batches')}
          >
            <BookOpen size={20} />
            <span>Batches</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'mentors' ? 'active' : ''}`}
            onClick={() => setActiveTab('mentors')}
          >
            <UserPlus size={20} />
            <span>Mentors</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            <Users size={20} />
            <span>Groups</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'departments' ? 'active' : ''}`}
            onClick={() => setActiveTab('departments')}
          >
            <BookOpen size={20} />
            <span>Departments</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'buildings' ? 'active' : ''}`}
            onClick={() => setActiveTab('buildings')}
          >
            <Settings size={20} />
            <span>Buildings</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>
            {activeTab === 'students' && 'Student Management'}
            {activeTab === 'batches' && 'Batch Management'}
            {activeTab === 'mentors' && 'Mentor Management'}
            {activeTab === 'groups' && 'Group Management'}
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'departments' && 'Department Management'}
            {activeTab === 'buildings' && 'Building Management'}
            {activeTab === 'settings' && 'System Settings'}
          </h1>
          <div className="header-actions">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search..." />
            </div>
            <div className="user-profile">
              <img src="/user-avatar.png" alt="User" />
              <span>Admin User</span>
            </div>
          </div>
        </header>

        <div className="content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="tab-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon" style={{backgroundColor: '#e9f5ff', color: '#0066cc'}}>
                    <Users size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{students.length}</h3>
                    <p>Total Students</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{backgroundColor: '#fff0e6', color: '#ff5500'}}>
                    <BookOpen size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{batches.length}</h3>
                    <p>Batches</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{backgroundColor: '#e6f7ee', color: '#00a86b'}}>
                    <UserPlus size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{mentors.length}</h3>
                    <p>Mentors</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{backgroundColor: '#f2e6ff', color: '#8c1aff'}}>
                    <Users size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{groups.length}</h3>
                    <p>Groups</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-cards">
                <div className="card">
                  <div className="card-header">
                    <h2>Recent Students</h2>
                    <button className="btn btn-text">View All</button>
                  </div>
                  <div className="card-body">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Batch</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.slice(0, 5).map(student => (
                          <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{batches.find(b => b.id === student.batchId)?.name || 'N/A'}</td>
                            <td><span className={`status-badge ${student.status}`}>{student.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h2>Recent Batches</h2>
                    <button className="btn btn-text">View All</button>
                  </div>
                  <div className="card-body">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Building</th>
                          <th>Mentors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {batches.slice(0, 5).map(batch => (
                          <tr key={batch.id}>
                            <td>{batch.name}</td>
                            <td>{batch.department}</td>
                            <td>{batch.building}</td>
                            <td>{batch.mentorIds.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="tab-content">
              <div className="toolbar">
                <div className="filters">
                  <div className="filter-group">
                    <label>Filter by Batch:</label>
                    <select 
                      value={selectedBatch} 
                      onChange={(e) => setSelectedBatch(e.target.value)}
                    >
                      <option value="all">All Batches</option>
                      {batches.map(batch => (
                        <option key={batch.id} value={batch.id}>{batch.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Status:</label>
                    <select>
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowAddStudentModal(true)}
                  >
                    <Plus size={18} />
                    Add Student
                  </button>
                  <label className="btn btn-primary">
                    <Upload size={18} />
                    Upload CSV
                    <input 
                      type="file" 
                      accept=".csv,.xlsx" 
                      onChange={handleCsvUpload} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                </div>
              </div>

              {csvFile && (
                <div className="csv-processor">
                  <p>File selected: {csvFile.name}</p>
                  <div>
                    <button className="btn btn-secondary" onClick={() => setCsvFile(null)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={processCsv}>
                      Process and Create Accounts
                    </button>
                  </div>
                </div>
              )}

              <div className="card">
                <div className="card-header">
                  <h2>Students</h2>
                  <span className="badge">{filteredStudents.length} students</span>
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Batch</th>
                        <th>Mentor</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map(student => (
                        <tr key={student.id}>
                          <td>
                            <div className="user-info">
                              <img src="/user-avatar.png" alt={student.name} />
                              {student.name}
                            </div>
                          </td>
                          <td>{student.email}</td>
                          <td>{batches.find(b => b.id === student.batchId)?.name || 'N/A'}</td>
                          <td>{student.mentorId ? mentors.find(m => m.id === student.mentorId)?.name : 'Not Assigned'}</td>
                          <td><span className={`status-badge ${student.status}`}>{student.status}</span></td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-icon" title="View">
                                <Eye size={16} />
                              </button>
                              <button className="btn-icon" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button className="btn-icon" title="Delete">
                                <Trash2 size={16} />
                              </button>
                              <button className="btn-icon" title="Download Credentials">
                                <Download size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Batches Tab */}
          {activeTab === 'batches' && (
            <div className="tab-content">
              <div className="toolbar">
                <div className="actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowAddBatchModal(true)}
                  >
                    <Plus size={18} />
                    Add Batch
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2>Batches</h2>
                  <span className="badge">{batches.length} batches</span>
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Building</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Mentors</th>
                        <th>Students</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map(batch => (
                        <tr key={batch.id}>
                          <td>{batch.name}</td>
                          <td>{batch.department}</td>
                          <td>{batch.building}</td>
                          <td>{batch.startDate.toLocaleDateString()}</td>
                          <td>{batch.endDate.toLocaleDateString()}</td>
                          <td>{batch.mentorIds.length}</td>
                          <td>{students.filter(s => s.batchId === batch.id).length}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-icon" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button className="btn-icon" title="Delete">
                                <Trash2 size={16} />
                              </button>
                              <button className="btn-icon" title="View Students">
                                <Users size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Groups Tab */}
          {activeTab === 'groups' && (
            <div className="tab-content">
              <div className="toolbar">
                <div className="filters">
                  <div className="filter-group">
                    <label>Filter by Batch:</label>
                    <select 
                      value={selectedBatch} 
                      onChange={(e) => setSelectedBatch(e.target.value)}
                    >
                      <option value="all">All Batches</option>
                      {batches.map(batch => (
                        <option key={batch.id} value={batch.id}>{batch.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="actions">
                  <button className="btn btn-primary">
                    <Plus size={18} />
                    Create Group
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2>Groups</h2>
                  <span className="badge">{filteredGroups.length} groups</span>
                </div>
                <div className="card-body">
                  <div className="grid-view">
                    {filteredGroups.map(group => (
                      <div key={group.id} className="group-card">
                        <div className="group-header">
                          <h3>{group.name}</h3>
                          <span className="group-batch">{batches.find(b => b.id === group.batchId)?.name}</span>
                        </div>
                        <div className="group-details">
                          <p><strong>Project:</strong> {group.project}</p>
                          <p><strong>Mentor:</strong> {group.mentorId ? mentors.find(m => m.id === group.mentorId)?.name : 'Not Assigned'}</p>
                          <p><strong>Members:</strong> {group.studentIds.length} students</p>
                        </div>
                        <div className="group-actions">
                          <button className="btn btn-secondary">
                            <Eye size={16} />
                            View Details
                          </button>
                          <button className="btn btn-secondary">
                            <Edit size={16} />
                            Edit
                          </button>
                          <button className="btn btn-secondary">
                            <Send size={16} />
                            Message
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="tab-content">
              <div className="toolbar">
                <div className="actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowAddDepartmentModal(true)}
                  >
                    <Plus size={18} />
                    Add Department
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2>Departments</h2>
                  <span className="badge">{departments.length} departments</span>
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Batches</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map(dept => (
                        <tr key={dept.id}>
                          <td>{dept.name}</td>
                          <td>{dept.description}</td>
                          <td>{batches.filter(b => b.department === dept.name).length}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-icon" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button className="btn-icon" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Buildings Tab */}
          {activeTab === 'buildings' && (
            <div className="tab-content">
              <div className="toolbar">
                <div className="actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowAddBuildingModal(true)}
                  >
                    <Plus size={18} />
                    Add Building
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2>Buildings</h2>
                  <span className="badge">{buildings.length} buildings</span>
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Block Number</th>
                        <th>Total Rooms</th>
                        <th>Room Capacity</th>
                        <th>Assigned Batch</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildings.map(building => (
                        <tr key={building.id}>
                          <td>{building.name}</td>
                          <td>{building.blockNumber}</td>
                          <td>{building.totalRooms}</td>
                          <td>{building.roomCapacity}</td>
                          <td>{batches.find(b => b.id === building.batchId)?.name || 'Not Assigned'}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-icon" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button className="btn-icon" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals would be implemented here */}
      {showAddStudentModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Student</h2>
              <button className="btn-icon" onClick={() => setShowAddStudentModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form className="form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter student name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter student email" />
                </div>
                <div className="form-group">
                  <label>Batch</label>
                  <select>
                    <option value="">Select a batch</option>
                    {batches.map(batch => (
                      <option key={batch.id} value={batch.id}>{batch.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Mentor</label>
                  <select>
                    <option value="">Select a mentor</option>
                    {mentors.map(mentor => (
                      <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddStudentModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={() => addStudent({
                name: 'New Student',
                email: 'new@example.com',
                batchId: batches[0].id,
                status: 'active'
              })}>
                Create Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS Styles
const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f5f5f5;
}

.admin-dashboard {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  background-color: #1f2937;
  color: white;
  padding: 1rem 0;
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  border-bottom: 1px solid #374151;
  margin-bottom: 1rem;
}

.logo img {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: #d1d5db;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
  border-radius: 0;
}

.nav-item:hover {
  background-color: #374151;
  color: white;
}

.nav-item.active {
  background-color: #3b82f6;
  color: white;
}

.nav-item span {
  font-size: 0.875rem;
}

.main-content {
  flex: 1;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  height: 80px;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box input {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 250px;
}

.search-box svg {
  position: absolute;
  left: 0.75rem;
  color: #9ca3af;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-profile span {
  font-weight: 500;
  color: #374151;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

.btn-text {
  background: none;
  color: #3b82f6;
  padding: 0.25rem 0.5rem;
}

.btn-text:hover {
  background-color: #eff6ff;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background: none;
  color: #6b7280;
  cursor: pointer;
}

.btn-icon:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.content {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.filters {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.filter-group select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

.csv-processor {
  padding: 1rem;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.csv-processor p {
  margin: 0;
  font-size: 0.875rem;
  color: #1e40af;
}

.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header h2 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.badge {
  background-color: #e5e7eb;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-body {
  padding: 1.5rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb;
}

.data-table td {
  padding: 1rem;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.data-table tr:hover {
  background-color: #f9fafb;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-info img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.active {
  background-color: #d1fae5;
  color: #065f46;
}

.status-badge.inactive {
  background-color: #fee2e2;
  color: #991b1b;
}

.action-buttons {
  display: flex;
  gap: 0.25rem;
}

.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.group-card {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.group-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.group-batch {
  background-color: #eff6ff;
  color: #1e40af;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.group-details p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.group-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
}

.stat-info h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.stat-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal {
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.modal-body {
  padding: 1.5rem;
  flex: 1;
}

.modal-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 240px;
  }
  
  .dashboard-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-dashboard {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    padding: 0.5rem 0;
  }
  
  .nav {
    flex-direction: row;
    overflow-x: auto;
    padding: 0 0.5rem;
  }
  
  .nav-item {
    padding: 0.5rem 1rem;
    flex-shrink: 0;
  }
  
  .nav-item span {
    display: none;
  }
  
  .header {
    flex-direction: column;
    height: auto;
    gap: 1rem;
    padding: 1rem;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .search-box input {
    width: 100%;
  }
  
  .content {
    padding: 1rem;
  }
  
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .actions {
    justify-content: center;
  }
  
  .data-table {
    display: block;
    overflow-x: auto;
  }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default AdminDashboard;













// import React, { useState } from 'react';
// import { Upload, Users, BookOpen, Settings, BarChart3, Filter, Search, Plus, Edit, Trash2 } from 'lucide-react';

// // Type definitions
// interface Student {
//   id: string;
//   name: string;
//   email: string;
//   batchId: string;
//   mentorId?: string;
//   createdAt: Date;
// }

// interface Batch {
//   id: string;
//   name: string;
//   startDate: Date;
//   endDate: Date;
//   mentorIds: string[];
// }

// interface Mentor {
//   id: string;
//   name: string;
//   email: string;
//   expertise: string[];
// }

// interface Group {
//   id: string;
//   name: string;
//   batchId: string;
//   studentIds: string[];
//   project: string;
// }

// const AdminDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('students');
//   const [students, setStudents] = useState<Student[]>([]);
//   const [batches, setBatches] = useState<Batch[]>([]);
//   const [mentors, setMentors] = useState<Mentor[]>([]);
//   const [groups, setGroups] = useState<Group[]>([]);
//   const [selectedBatch, setSelectedBatch] = useState<string>('all');
//   const [showAddStudentModal, setShowAddStudentModal] = useState(false);
//   const [showAddBatchModal, setShowAddBatchModal] = useState(false);
//   const [showAddMentorModal, setShowAddMentorModal] = useState(false);
//   const [csvFile, setCsvFile] = useState<File | null>(null);

//   // Handle CSV file upload
//   const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
//       setCsvFile(file);
//       // Here you would process the CSV file and create student accounts
//       alert(`CSV file "${file.name}" uploaded successfully. Process to create accounts.`);
//     } else {
//       alert('Please upload a valid CSV file.');
//     }
//   };

//   // Process CSV and create student accounts
//   const processCsv = () => {
//     if (!csvFile) return;
    
//     // In a real application, you would parse the CSV and create accounts
//     // This is just a mock implementation
//     const mockStudentsFromCsv: Student[] = [
//       { id: '1', name: 'John Doe', email: 'john@example.com', batchId: 'batch1', createdAt: new Date() },
//       { id: '2', name: 'Jane Smith', email: 'jane@example.com', batchId: 'batch1', createdAt: new Date() },
//     ];
    
//     setStudents([...students, ...mockStudentsFromCsv]);
//     setCsvFile(null);
//     alert('Student accounts created successfully!');
//   };

//   // Add a new student manually
//   const addStudent = (student: Omit<Student, 'id' | 'createdAt'>) => {
//     const newStudent: Student = {
//       ...student,
//       id: Math.random().toString(36).substr(2, 9),
//       createdAt: new Date(),
//     };
//     setStudents([...students, newStudent]);
//     setShowAddStudentModal(false);
//   };

//   // Add a new batch
//   const addBatch = (batch: Omit<Batch, 'id'>) => {
//     const newBatch: Batch = {
//       ...batch,
//       id: Math.random().toString(36).substr(2, 9),
//     };
//     setBatches([...batches, newBatch]);
//     setShowAddBatchModal(false);
//   };

//   // Add a new mentor
//   const addMentor = (mentor: Omit<Mentor, 'id'>) => {
//     const newMentor: Mentor = {
//       ...mentor,
//       id: Math.random().toString(36).substr(2, 9),
//     };
//     setMentors([...mentors, newMentor]);
//     setShowAddMentorModal(false);
//   };

//   // Filter students by batch
//   const filteredStudents = selectedBatch === 'all' 
//     ? students 
//     : students.filter(student => student.batchId === selectedBatch);

//   // Filter groups by batch
//   const filteredGroups = selectedBatch === 'all'
//     ? groups
//     : groups.filter(group => group.batchId === selectedBatch);

//   return (
//     <div className="admin-dashboard">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="logo">Admin Panel</div>
//         <nav className="nav">
//           <button 
//             className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
//             onClick={() => setActiveTab('dashboard')}
//           >
//             <BarChart3 size={20} />
//             <span>Dashboard</span>
//           </button>
//           <button 
//             className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
//             onClick={() => setActiveTab('students')}
//           >
//             <Users size={20} />
//             <span>Students</span>
//           </button>
//           <button 
//             className={`nav-item ${activeTab === 'batches' ? 'active' : ''}`}
//             onClick={() => setActiveTab('batches')}
//           >
//             <BookOpen size={20} />
//             <span>Batches</span>
//           </button>
//           <button 
//             className={`nav-item ${activeTab === 'mentors' ? 'active' : ''}`}
//             onClick={() => setActiveTab('mentors')}
//           >
//             <Users size={20} />
//             <span>Mentors</span>
//           </button>
//           <button 
//             className={`nav-item ${activeTab === 'groups' ? 'active' : ''}`}
//             onClick={() => setActiveTab('groups')}
//           >
//             <Users size={20} />
//             <span>Groups</span>
//           </button>
//           <button 
//             className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('settings')}
//           >
//             <Settings size={20} />
//             <span>Settings</span>
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <header className="header">
//           <h1>
//             {activeTab === 'students' && 'Student Management'}
//             {activeTab === 'batches' && 'Batch Management'}
//             {activeTab === 'mentors' && 'Mentor Management'}
//             {activeTab === 'groups' && 'Group Management'}
//             {activeTab === 'dashboard' && 'Dashboard'}
//             {activeTab === 'settings' && 'Settings'}
//           </h1>
//           <div className="header-actions">
//             <div className="search-box">
//               <Search size={18} />
//               <input type="text" placeholder="Search..." />
//             </div>
//             <button className="btn btn-primary">
//               <Plus size={18} />
//               Add New
//             </button>
//           </div>
//         </header>

//         <div className="content">
//           {/* Students Tab */}
//           {activeTab === 'students' && (
//             <div className="tab-content">
//               <div className="toolbar">
//                 <div className="filters">
//                   <div className="filter-group">
//                     <label>Filter by Batch:</label>
//                     <select 
//                       value={selectedBatch} 
//                       onChange={(e) => setSelectedBatch(e.target.value)}
//                     >
//                       <option value="all">All Batches</option>
//                       {batches.map(batch => (
//                         <option key={batch.id} value={batch.id}>{batch.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="actions">
//                   <button 
//                     className="btn btn-secondary"
//                     onClick={() => setShowAddStudentModal(true)}
//                   >
//                     <Plus size={18} />
//                     Add Student
//                   </button>
//                   <label className="btn btn-primary">
//                     <Upload size={18} />
//                     Upload CSV
//                     <input 
//                       type="file" 
//                       accept=".csv" 
//                       onChange={handleCsvUpload} 
//                       style={{ display: 'none' }} 
//                     />
//                   </label>
//                 </div>
//               </div>

//               {csvFile && (
//                 <div className="csv-processor">
//                   <p>CSV file selected: {csvFile.name}</p>
//                   <button className="btn btn-primary" onClick={processCsv}>
//                     Process and Create Accounts
//                   </button>
//                 </div>
//               )}

//               <div className="card">
//                 <div className="card-header">
//                   <h2>Students</h2>
//                 </div>
//                 <div className="card-body">
//                   <table className="data-table">
//                     <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Batch</th>
//                         <th>Mentor</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredStudents.map(student => (
//                         <tr key={student.id}>
//                           <td>{student.name}</td>
//                           <td>{student.email}</td>
//                           <td>{batches.find(b => b.id === student.batchId)?.name || 'N/A'}</td>
//                           <td>{student.mentorId ? mentors.find(m => m.id === student.mentorId)?.name : 'Not Assigned'}</td>
//                           <td>
//                             <button className="btn-icon" title="Edit">
//                               <Edit size={16} />
//                             </button>
//                             <button className="btn-icon" title="Delete">
//                               <Trash2 size={16} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Batches Tab */}
//           {activeTab === 'batches' && (
//             <div className="tab-content">
//               <div className="toolbar">
//                 <div className="actions">
//                   <button 
//                     className="btn btn-primary"
//                     onClick={() => setShowAddBatchModal(true)}
//                   >
//                     <Plus size={18} />
//                     Add Batch
//                   </button>
//                 </div>
//               </div>

//               <div className="card">
//                 <div className="card-header">
//                   <h2>Batches</h2>
//                 </div>
//                 <div className="card-body">
//                   <table className="data-table">
//                     <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Mentors</th>
//                         <th>Students</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {batches.map(batch => (
//                         <tr key={batch.id}>
//                           <td>{batch.name}</td>
//                           <td>{batch.startDate.toLocaleDateString()}</td>
//                           <td>{batch.endDate.toLocaleDateString()}</td>
//                           <td>{batch.mentorIds.length}</td>
//                           <td>{students.filter(s => s.batchId === batch.id).length}</td>
//                           <td>
//                             <button className="btn-icon" title="Edit">
//                               <Edit size={16} />
//                             </button>
//                             <button className="btn-icon" title="Delete">
//                               <Trash2 size={16} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Groups Tab */}
//           {activeTab === 'groups' && (
//             <div className="tab-content">
//               <div className="toolbar">
//                 <div className="filters">
//                   <div className="filter-group">
//                     <label>Filter by Batch:</label>
//                     <select 
//                       value={selectedBatch} 
//                       onChange={(e) => setSelectedBatch(e.target.value)}
//                     >
//                       <option value="all">All Batches</option>
//                       {batches.map(batch => (
//                         <option key={batch.id} value={batch.id}>{batch.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="actions">
//                   <button className="btn btn-primary">
//                     <Plus size={18} />
//                     Create Group
//                   </button>
//                 </div>
//               </div>

//               <div className="card">
//                 <div className="card-header">
//                   <h2>Groups</h2>
//                 </div>
//                 <div className="card-body">
//                   <div className="grid-view">
//                     {filteredGroups.map(group => (
//                       <div key={group.id} className="group-card">
//                         <h3>{group.name}</h3>
//                         <p>Batch: {batches.find(b => b.id === group.batchId)?.name}</p>
//                         <p>Project: {group.project}</p>
//                         <p>Members: {group.studentIds.length}</p>
//                         <div className="group-actions">
//                           <button className="btn btn-secondary">View Details</button>
//                           <button className="btn btn-secondary">Edit</button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Dashboard Tab */}
//           {activeTab === 'dashboard' && (
//             <div className="tab-content">
//               <div className="stats-grid">
//                 <div className="stat-card">
//                   <div className="stat-icon">
//                     <Users size={24} />
//                   </div>
//                   <div className="stat-info">
//                     <h3>{students.length}</h3>
//                     <p>Total Students</p>
//                   </div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-icon">
//                     <BookOpen size={24} />
//                   </div>
//                   <div className="stat-info">
//                     <h3>{batches.length}</h3>
//                     <p>Batches</p>
//                   </div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-icon">
//                     <Users size={24} />
//                   </div>
//                   <div className="stat-info">
//                     <h3>{mentors.length}</h3>
//                     <p>Mentors</p>
//                   </div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-icon">
//                     <Users size={24} />
//                   </div>
//                   <div className="stat-info">
//                     <h3>{groups.length}</h3>
//                     <p>Groups</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="card">
//                 <div className="card-header">
//                   <h2>Recent Activity</h2>
//                 </div>
//                 <div className="card-body">
//                   <p>No recent activity</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals would be implemented here */}
//       {showAddStudentModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Add New Student</h2>
//             {/* Form for adding student */}
//             <button onClick={() => setShowAddStudentModal(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       {showAddBatchModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Add New Batch</h2>
//             {/* Form for adding batch */}
//             <button onClick={() => setShowAddBatchModal(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       {showAddMentorModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Add New Mentor</h2>
//             {/* Form for adding mentor */}
//             <button onClick={() => setShowAddMentorModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // CSS Styles
// const styles = `
// .admin-dashboard {
//   display: flex;
//   min-height: 100vh;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
// }

// .sidebar {
//   width: 250px;
//   background-color: #1f2937;
//   color: white;
//   padding: 1rem 0;
// }

// .logo {
//   padding: 1rem 1.5rem;
//   font-size: 1.5rem;
//   font-weight: bold;
//   border-bottom: 1px solid #374151;
//   margin-bottom: 1rem;
// }

// .nav {
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// }

// .nav-item {
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   padding: 0.75rem 1.5rem;
//   background: none;
//   border: none;
//   color: #d1d5db;
//   cursor: pointer;
//   transition: all 0.2s;
// }

// .nav-item:hover {
//   background-color: #374151;
//   color: white;
// }

// .nav-item.active {
//   background-color: #3b82f6;
//   color: white;
// }

// .nav-item span {
//   font-size: 0.875rem;
// }

// .main-content {
//   flex: 1;
//   background-color: #f9fafb;
// }

// .header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 2rem;
//   background-color: white;
//   border-bottom: 1px solid #e5e7eb;
// }

// .header h1 {
//   font-size: 1.5rem;
//   font-weight: 600;
//   color: #111827;
// }

// .header-actions {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// }

// .search-box {
//   position: relative;
//   display: flex;
//   align-items: center;
// }

// .search-box input {
//   padding: 0.5rem 1rem 0.5rem 2.5rem;
//   border: 1px solid #d1d5db;
//   border-radius: 0.375rem;
//   font-size: 0.875rem;
// }

// .search-box svg {
//   position: absolute;
//   left: 0.75rem;
//   color: #9ca3af;
// }

// .btn {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 0.375rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s;
// }

// .btn-primary {
//   background-color: #3b82f6;
//   color: white;
// }

// .btn-primary:hover {
//   background-color: #2563eb;
// }

// .btn-secondary {
//   background-color: #e5e7eb;
//   color: #374151;
// }

// .btn-secondary:hover {
//   background-color: #d1d5db;
// }

// .btn-icon {
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   padding: 0.25rem;
//   border: none;
//   border-radius: 0.25rem;
//   background: none;
//   color: #6b7280;
//   cursor: pointer;
// }

// .btn-icon:hover {
//   background-color: #f3f4f6;
//   color: #374151;
// }

// .content {
//   padding: 2rem;
// }

// .tab-content {
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// }

// .toolbar {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .filters {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// }

// .filter-group {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// }

// .filter-group label {
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: #374151;
// }

// .filter-group select {
//   padding: 0.5rem;
//   border: 1px solid #d1d5db;
//   border-radius: 0.375rem;
//   font-size: 0.875rem;
// }

// .actions {
//   display: flex;
//   gap: 0.75rem;
// }

// .csv-processor {
//   padding: 1rem;
//   background-color: #eff6ff;
//   border: 1px solid #bfdbfe;
//   border-radius: 0.375rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .csv-processor p {
//   margin: 0;
//   font-size: 0.875rem;
//   color: #1e40af;
// }

// .card {
//   background-color: white;
//   border-radius: 0.5rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// }

// .card-header {
//   padding: 1rem 1.5rem;
//   border-bottom: 1px solid #e5e7eb;
// }

// .card-header h2 {
//   margin: 0;
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: #111827;
// }

// .card-body {
//   padding: 1.5rem;
// }

// .data-table {
//   width: 100%;
//   border-collapse: collapse;
// }

// .data-table th {
//   padding: 0.75rem 1rem;
//   text-align: left;
//   font-size: 0.75rem;
//   font-weight: 500;
//   color: #6b7280;
//   text-transform: uppercase;
//   border-bottom: 1px solid #e5e7eb;
// }

// .data-table td {
//   padding: 1rem;
//   font-size: 0.875rem;
//   color: #374151;
//   border-bottom: 1px solid #f3f4f6;
// }

// .data-table tr:hover {
//   background-color: #f9fafb;
// }

// .grid-view {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 1rem;
// }

// .group-card {
//   padding: 1rem;
//   border: 1px solid #e5e7eb;
//   border-radius: 0.375rem;
//   background-color: white;
// }

// .group-card h3 {
//   margin: 0 0 0.5rem 0;
//   font-size: 1rem;
//   font-weight: 600;
//   color: #111827;
// }

// .group-card p {
//   margin: 0.25rem 0;
//   font-size: 0.875rem;
//   color: #6b7280;
// }

// .group-actions {
//   display: flex;
//   gap: 0.5rem;
//   margin-top: 1rem;
// }

// .stats-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 2rem;
// }

// .stat-card {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   padding: 1.5rem;
//   background-color: white;
//   border-radius: 0.5rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// }

// .stat-icon {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 3rem;
//   height: 3rem;
//   border-radius: 0.375rem;
//   background-color: #eff6ff;
//   color: #3b82f6;
// }

// .stat-info h3 {
//   margin: 0;
//   font-size: 1.5rem;
//   font-weight: 600;
//   color: #111827;
// }

// .stat-info p {
//   margin: 0;
//   font-size: 0.875rem;
//   color: #6b7280;
// }

// .modal {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 50;
// }

// .modal-content {
//   background-color: white;
//   border-radius: 0.5rem;
//   padding: 1.5rem;
//   max-width: 500px;
//   width: 100%;
// }
// `;

// // Inject styles
// document.head.appendChild(document.createElement('style')).textContent = styles;

// export default AdminDashboard;