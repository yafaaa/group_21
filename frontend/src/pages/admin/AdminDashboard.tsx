import React, { useState } from 'react';
import { Upload, Users, BookOpen, Settings, BarChart3, Filter, Search, Plus, Edit, Trash2 } from 'lucide-react';

// Type definitions
interface Student {
  id: string;
  name: string;
  email: string;
  batchId: string;
  mentorId?: string;
  createdAt: Date;
}

interface Batch {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  mentorIds: string[];
}

interface Mentor {
  id: string;
  name: string;
  email: string;
  expertise: string[];
}

interface Group {
  id: string;
  name: string;
  batchId: string;
  studentIds: string[];
  project: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [showAddMentorModal, setShowAddMentorModal] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // Handle CSV file upload
  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setCsvFile(file);
      // Here you would process the CSV file and create student accounts
      alert(`CSV file "${file.name}" uploaded successfully. Process to create accounts.`);
    } else {
      alert('Please upload a valid CSV file.');
    }
  };

  // Process CSV and create student accounts
  const processCsv = () => {
    if (!csvFile) return;
    
    // In a real application, you would parse the CSV and create accounts
    // This is just a mock implementation
    const mockStudentsFromCsv: Student[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com', batchId: 'batch1', createdAt: new Date() },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', batchId: 'batch1', createdAt: new Date() },
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
        <div className="logo">Admin Panel</div>
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
            <Users size={20} />
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
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'settings' && 'Settings'}
          </h1>
          <div className="header-actions">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="btn btn-primary">
              <Plus size={18} />
              Add New
            </button>
          </div>
        </header>

        <div className="content">
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
                      accept=".csv" 
                      onChange={handleCsvUpload} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                </div>
              </div>

              {csvFile && (
                <div className="csv-processor">
                  <p>CSV file selected: {csvFile.name}</p>
                  <button className="btn btn-primary" onClick={processCsv}>
                    Process and Create Accounts
                  </button>
                </div>
              )}

              <div className="card">
                <div className="card-header">
                  <h2>Students</h2>
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Batch</th>
                        <th>Mentor</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map(student => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.email}</td>
                          <td>{batches.find(b => b.id === student.batchId)?.name || 'N/A'}</td>
                          <td>{student.mentorId ? mentors.find(m => m.id === student.mentorId)?.name : 'Not Assigned'}</td>
                          <td>
                            <button className="btn-icon" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className="btn-icon" title="Delete">
                              <Trash2 size={16} />
                            </button>
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
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
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
                          <td>{batch.startDate.toLocaleDateString()}</td>
                          <td>{batch.endDate.toLocaleDateString()}</td>
                          <td>{batch.mentorIds.length}</td>
                          <td>{students.filter(s => s.batchId === batch.id).length}</td>
                          <td>
                            <button className="btn-icon" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className="btn-icon" title="Delete">
                              <Trash2 size={16} />
                            </button>
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
                </div>
                <div className="card-body">
                  <div className="grid-view">
                    {filteredGroups.map(group => (
                      <div key={group.id} className="group-card">
                        <h3>{group.name}</h3>
                        <p>Batch: {batches.find(b => b.id === group.batchId)?.name}</p>
                        <p>Project: {group.project}</p>
                        <p>Members: {group.studentIds.length}</p>
                        <div className="group-actions">
                          <button className="btn btn-secondary">View Details</button>
                          <button className="btn btn-secondary">Edit</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="tab-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{students.length}</h3>
                    <p>Total Students</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <BookOpen size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{batches.length}</h3>
                    <p>Batches</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{mentors.length}</h3>
                    <p>Mentors</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{groups.length}</h3>
                    <p>Groups</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2>Recent Activity</h2>
                </div>
                <div className="card-body">
                  <p>No recent activity</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals would be implemented here */}
      {showAddStudentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Student</h2>
            {/* Form for adding student */}
            <button onClick={() => setShowAddStudentModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showAddBatchModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Batch</h2>
            {/* Form for adding batch */}
            <button onClick={() => setShowAddBatchModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showAddMentorModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Mentor</h2>
            {/* Form for adding mentor */}
            <button onClick={() => setShowAddMentorModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS Styles
const styles = `
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #1f2937;
  color: white;
  padding: 1rem 0;
}

.logo {
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid #374151;
  margin-bottom: 1rem;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
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
}

.search-box svg {
  position: absolute;
  left: 0.75rem;
  color: #9ca3af;
}

.btn {
  display: flex;
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

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
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
}

.filters {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-header h2 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
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

.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.group-card {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;
}

.group-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.group-card p {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.group-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
  border-radius: 0.375rem;
  background-color: #eff6ff;
  color: #3b82f6;
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

.modal {
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
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  max-width: 500px;
  width: 100%;
}
`;

// Inject styles
document.head.appendChild(document.createElement('style')).textContent = styles;

export default AdminDashboard;