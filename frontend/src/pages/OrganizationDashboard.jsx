import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import Table from '../components/Table'

function OrganizationDashboard() {
  const menuItems = [
    { path: '/dashboard/organization', label: 'Overview', icon: '📊' },
    { path: '/dashboard/organization/internships', label: 'Internship Posts', icon: '�' },
    { path: '/dashboard/organization/applications', label: 'Applications', icon: '�' },
    { path: '/dashboard/organization/candidates', label: 'AI Matched Candidates', icon: '�' },
    { path: '/dashboard/organization/analytics', label: 'Analytics', icon: '📈' },
    { path: '/dashboard/organization/settings', label: 'Settings', icon: '⚙️' },
  ]

  const [applications] = useState([
    { id: 1, name: 'John Doe', position: 'Software Developer', match: '95%', applied: '2025-10-01', status: 'Pending' },
    { id: 2, name: 'Jane Smith', position: 'Data Analyst', match: '92%', applied: '2025-09-30', status: 'Reviewed' },
    { id: 3, name: 'Mike Johnson', position: 'Web Developer', match: '88%', applied: '2025-09-28', status: 'Shortlisted' },
    { id: 4, name: 'Sarah Williams', position: 'Software Developer', match: '90%', applied: '2025-09-27', status: 'Pending' },
  ])

  const columns = [
    { label: 'Candidate', key: 'name' },
    { label: 'Position', key: 'position' },
    { label: 'Match Score', key: 'match' },
    { label: 'Applied', key: 'applied' },
    { 
      label: 'Status', 
      key: 'status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === 'Shortlisted' 
            ? 'bg-green-100 text-green-800' 
            : row.status === 'Reviewed'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
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
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View Profile
          </button>
          <button 
            onClick={() => onAction('shortlist', row.id)}
            className="text-green-600 hover:text-green-800 font-medium text-sm"
          >
            Shortlist
          </button>
        </div>
      )
    }
  ]

  const handleAction = (action, id) => {
    console.log(`${action} candidate with id:`, id)
    // Implement action logic here
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userRole="organization" menuItems={menuItems} />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Organization Dashboard</h1>
          <p className="text-gray-600">Manage internship posts and review AI-matched candidates.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            title="Active Internships" 
            value="12" 
            icon="�" 
            color="blue"
            subtitle="3 new this week"
          />
          <Card 
            title="Applications" 
            value="248" 
            icon="�" 
            color="green"
            subtitle="45 pending review"
          />
          <Card 
            title="AI Matches" 
            value="186" 
            icon="�" 
            color="purple"
            subtitle="High quality candidates"
          />
          <Card 
            title="Shortlisted" 
            value="42" 
            icon="⭐" 
            color="orange"
            subtitle="Ready for interview"
          />
        </div>

        {/* Recent Applications */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Recent Applications</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
              Post New Internship
            </button>
          </div>
          <Table columns={columns} data={applications} onAction={handleAction} />
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Internship Performance</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Software Developer</span>
                  <span className="text-gray-600">85 applicants</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Data Analyst</span>
                  <span className="text-gray-600">62 applicants</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Web Developer</span>
                  <span className="text-gray-600">48 applicants</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">UI/UX Designer</span>
                  <span className="text-gray-600">53 applicants</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-gray-800">Candidate Shortlisted</p>
                  <p className="text-sm text-gray-600">John Doe for Software Developer role</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold text-gray-800">New AI Matches</p>
                  <p className="text-sm text-gray-600">15 highly compatible candidates found</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl">�</span>
                <div>
                  <p className="font-semibold text-gray-800">Internship Posted</p>
                  <p className="text-sm text-gray-600">UI/UX Designer position published</p>
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

export default OrganizationDashboard
