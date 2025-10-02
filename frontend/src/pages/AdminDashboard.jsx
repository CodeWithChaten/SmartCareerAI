import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import Table from '../components/Table'

function AdminDashboard() {
  const menuItems = [
    { path: '/dashboard/admin', label: 'Overview', icon: '📊' },
    { path: '/dashboard/admin/users', label: 'Users', icon: '👥' },
    { path: '/dashboard/admin/organizations', label: 'Organizations', icon: '🏢' },
    { path: '/dashboard/admin/analytics', label: 'Analytics', icon: '📈' },
    { path: '/dashboard/admin/reports', label: 'Reports', icon: '📄' },
    { path: '/dashboard/admin/settings', label: 'System Settings', icon: '⚙️' },
  ]

  const [organizations] = useState([
    { id: 1, name: 'ABC University', students: 1234, courses: 45, status: 'Active' },
    { id: 2, name: 'XYZ College', students: 890, courses: 32, status: 'Active' },
    { id: 3, name: 'Tech Institute', students: 567, courses: 28, status: 'Pending' },
    { id: 4, name: 'Global Academy', students: 2100, courses: 67, status: 'Active' },
  ])

  const columns = [
    { label: 'Organization', key: 'name' },
    { label: 'Students', key: 'students' },
    { label: 'Courses', key: 'courses' },
    { 
      label: 'Status', 
      key: 'status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : row.status === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      label: 'Actions',
      render: (row, onAction) => (
        <div className="space-x-2">
          <button 
            onClick={() => onAction('view', row.id)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View
          </button>
          <button 
            onClick={() => onAction('approve', row.id)}
            className="text-green-600 hover:text-green-800 font-medium"
          >
            Approve
          </button>
          <button 
            onClick={() => onAction('suspend', row.id)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Suspend
          </button>
        </div>
      )
    }
  ]

  const handleAction = (action, id) => {
    console.log(`${action} organization with id:`, id)
    // Implement action logic here
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userRole="admin" menuItems={menuItems} />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor PM Internship Scheme allocation and system health.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            title="Total Students" 
            value="12,458" 
            icon="�‍🎓" 
            color="blue"
            subtitle="+18% from last month"
          />
          <Card 
            title="Organizations" 
            value="156" 
            icon="🏢" 
            color="green"
            subtitle="8 pending approval"
          />
          <Card 
            title="Active Internships" 
            value="1,842" 
            icon="�" 
            color="purple"
            subtitle="Across all organizations"
          />
          <Card 
            title="Successful Matches" 
            value="8,234" 
            icon="🎯" 
            color="orange"
            subtitle="AI allocation success: 94%"
          />
        </div>

        {/* Organizations Table */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Organizations</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
              Add Organization
            </button>
          </div>
          <Table columns={columns} data={organizations} onAction={handleAction} />
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Allocation Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-blue-600">18,934</p>
                </div>
                <span className="text-3xl">�</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">AI Matches Made</p>
                  <p className="text-2xl font-bold text-green-600">8,234</p>
                </div>
                <span className="text-3xl">�</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Avg Match Score</p>
                  <p className="text-2xl font-bold text-purple-600">87%</p>
                </div>
                <span className="text-3xl">⭐</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-orange-600">94%</p>
                </div>
                <span className="text-3xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">System Logs</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <span className="text-xl">✅</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">Database backup completed</p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-xl">🔄</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">System update installed</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-xl">⚠️</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">High server load detected</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-xl">👤</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">New organization registered</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <span className="text-xl">✓</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">Security scan passed</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
