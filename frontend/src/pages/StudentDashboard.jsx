import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import Table from '../components/Table'

function StudentDashboard() {
  const [currentView, setCurrentView] = useState('overview')
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedInternship, setSelectedInternship] = useState(null)
  
  const menuItems = [
    { path: '/dashboard/student', label: 'Overview', icon: '📊', id: 'overview' },
    { path: '/dashboard/student/recommendations', label: 'Recommended Internships', icon: '🎯', id: 'recommendations' },
    { path: '/dashboard/student/applications', label: 'My Applications', icon: '📝', id: 'applications' },
    { path: '/dashboard/student/profile', label: 'Skill Profile', icon: '👤', id: 'profile' },
    { path: '/dashboard/student/documents', label: 'Documents', icon: '📄', id: 'documents' },
  ]

  const [applications, setApplications] = useState([
    { id: 1, company: 'Tech Mahindra', position: 'Software Developer', location: 'Bangalore', duration: '6 months', stipend: '₹15,000', applied: '2025-09-25', status: 'Under Review', match: '92%' },
    { id: 2, company: 'Infosys', position: 'Data Analyst', location: 'Hyderabad', duration: '6 months', stipend: '₹12,000', applied: '2025-09-28', status: 'Shortlisted', match: '88%' },
    { id: 3, company: 'TCS', position: 'Web Developer', location: 'Mumbai', duration: '4 months', stipend: '₹10,000', applied: '2025-10-01', status: 'Applied', match: '85%' },
    { id: 4, company: 'Wipro', position: 'UI/UX Designer', location: 'Pune', duration: '5 months', stipend: '₹13,000', applied: '2025-09-20', status: 'Rejected', match: '78%' },
  ])

  const [recommendations] = useState([
    { id: 101, company: 'Tech Mahindra', position: 'Full Stack Developer', location: 'Bangalore', duration: '6 months', stipend: '₹15,000', skills: ['React', 'Node.js', 'MongoDB'], match: '95%', description: 'Work on cutting-edge web applications using MERN stack' },
    { id: 102, company: 'Infosys', position: 'Data Science Intern', location: 'Hyderabad', duration: '6 months', stipend: '₹14,000', skills: ['Python', 'Machine Learning', 'Data Analysis'], match: '90%', description: 'Analyze large datasets and build ML models' },
    { id: 103, company: 'Accenture', position: 'Cloud Engineer', location: 'Bangalore', duration: '5 months', stipend: '₹16,000', skills: ['AWS', 'Docker', 'Kubernetes'], match: '87%', description: 'Deploy and manage cloud infrastructure' },
    { id: 104, company: 'HCL', position: 'Mobile App Developer', location: 'Noida', duration: '4 months', stipend: '₹12,000', skills: ['React Native', 'Flutter', 'Firebase'], match: '85%', description: 'Build cross-platform mobile applications' },
    { id: 105, company: 'Capgemini', position: 'Cybersecurity Analyst', location: 'Chennai', duration: '6 months', stipend: '₹13,000', skills: ['Network Security', 'Ethical Hacking', 'SIEM'], match: '82%', description: 'Monitor and protect enterprise systems' },
    { id: 106, company: 'Cognizant', position: 'DevOps Engineer', location: 'Pune', duration: '5 months', stipend: '₹14,500', skills: ['Jenkins', 'Git', 'CI/CD'], match: '80%', description: 'Automate deployment pipelines' },
  ])

  const [profile, setProfile] = useState({
    name: 'Chandan Singh',
    email: 'demo.student@pminternship.gov.in',
    phone: '+91 98******70',
    college: 'MPGI Kanpur',
    degree: 'B.Tech Computer Science',
    year: '2nd Year',
    cgpa: '8.5',
    skills: ['React', 'Node.js', 'Python', 'MongoDB', 'JavaScript', 'FastAPI'],
    interests: ['Web Development', 'Machine Learning', 'Cloud Computing'],
    languages: ['Hindi', 'English'],
    resume: 'resume_chandan_singh.pdf',
    linkedIn: 'linkedin.com/in/chandansingh',
    github: 'github.com/chandansingh',
  })

  const [documents] = useState([
    { id: 1, name: 'Resume.pdf', type: 'Resume', size: '245 KB', uploaded: '2025-09-15', status: 'Verified' },
    { id: 2, name: '10th_Marksheet.pdf', type: 'Academic', size: '1.2 MB', uploaded: '2025-09-15', status: 'Verified' },
    { id: 3, name: '12th_Marksheet.pdf', type: 'Academic', size: '980 KB', uploaded: '2025-09-15', status: 'Verified' },
    { id: 4, name: 'College_ID.pdf', type: 'Identity', size: '567 KB', uploaded: '2025-09-15', status: 'Verified' },
    { id: 5, name: 'Coding_Certificate.pdf', type: 'Certificate', size: '345 KB', uploaded: '2025-09-20', status: 'Pending' },
  ])

  const handleApply = (internship) => {
    setSelectedInternship(internship)
    setShowApplyModal(true)
  }

  const confirmApply = () => {
    const newApplication = {
      id: applications.length + 1,
      company: selectedInternship.company,
      position: selectedInternship.position,
      location: selectedInternship.location,
      duration: selectedInternship.duration,
      stipend: selectedInternship.stipend,
      applied: new Date().toISOString().split('T')[0],
      status: 'Applied',
      match: selectedInternship.match
    }
    setApplications([newApplication, ...applications])
    setShowApplyModal(false)
    setSelectedInternship(null)
    alert('✅ Application submitted successfully!')
  }

  const handleWithdrawApplication = (id) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      setApplications(applications.filter(app => app.id !== id))
      alert('Application withdrawn successfully!')
    }
  }

  const handleAddSkill = () => {
    const skill = prompt('Enter new skill:')
    if (skill && !profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: [...profile.skills, skill] })
      alert('✅ Skill added successfully!')
    }
  }

  const handleRemoveSkill = (skill) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) })
  }

  const applicationColumns = [
    { label: 'Company', key: 'company' },
    { label: 'Position', key: 'position' },
    { label: 'Location', key: 'location' },
    { label: 'Match', key: 'match' },
    { label: 'Applied Date', key: 'applied' },
    { 
      label: 'Status', 
      key: 'status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === 'Shortlisted' 
            ? 'bg-green-100 text-green-800' 
            : row.status === 'Under Review'
            ? 'bg-blue-100 text-blue-800'
            : row.status === 'Rejected'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      label: 'Action',
      key: 'action',
      render: (row) => (
        <button
          onClick={() => handleWithdrawApplication(row.id)}
          disabled={row.status === 'Rejected'}
          className={`text-xs ${row.status === 'Rejected' ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'} font-medium`}
        >
          {row.status === 'Rejected' ? 'Closed' : 'Revoke'}
        </button>
      )
    }
  ]

  const documentColumns = [
    { label: 'Document Name', key: 'name' },
    { label: 'Type', key: 'type' },
    { label: 'Size', key: 'size' },
    { label: 'Uploaded', key: 'uploaded' },
    {
      label: 'Status',
      key: 'status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      label: 'Action',
      key: 'action',
      render: () => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
          <button className="text-red-600 hover:text-red-800 text-xs">Delete</button>
        </div>
      )
    }
  ]

  const renderOverview = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back, {profile.name}! Track your internship journey.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          title="Profile Strength" 
          value="85%" 
          icon="💪" 
          color="blue"
          subtitle="Complete your profile"
        />
        <Card 
          title="Applications" 
          value={applications.length.toString()} 
          icon="📝" 
          color="orange"
          subtitle={`${applications.filter(a => a.status !== 'Rejected').length} active`}
        />
        <Card 
          title="Recommendations" 
          value={recommendations.length.toString()} 
          icon="🎯" 
          color="green"
          subtitle="AI-matched opportunities"
        />
        <Card 
          title="Match Score" 
          value="88%" 
          icon="⭐" 
          color="purple"
          subtitle="Average compatibility"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white">
        <h2 className="text-xl font-bold mb-4">⚡ Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentView('recommendations')}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-lg rounded-lg p-4 transition"
          >
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-medium">Browse Internships</div>
          </button>
          <button
            onClick={() => setCurrentView('applications')}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-lg rounded-lg p-4 transition"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-medium">My Applications</div>
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-lg rounded-lg p-4 transition"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-medium">Update Profile</div>
          </button>
          <button
            onClick={() => setCurrentView('documents')}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-lg rounded-lg p-4 transition"
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="font-medium">Upload Documents</div>
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Recent Applications</h2>
          <button
            onClick={() => setCurrentView('applications')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="bg-white rounded-lg shadow">
          <Table columns={applicationColumns} data={applications.slice(0, 3)} />
        </div>
      </div>

      {/* AI Recommendations & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">🤖 Top Matches</h2>
            <button
              onClick={() => setCurrentView('recommendations')}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recommendations.slice(0, 2).map(rec => (
              <div key={rec.id} className="border border-blue-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800">{rec.position}</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">{rec.match} Match</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.company} • {rec.location} • {rec.duration}</p>
                <p className="text-xs text-gray-500 mb-3">Skills: {rec.skills.join(', ')}</p>
                <button
                  onClick={() => handleApply(rec)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-gray-800">Application Shortlisted</p>
                <p className="text-sm text-gray-600">Infosys - Data Analyst Position</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-semibold text-gray-800">New Recommendations</p>
                <p className="text-sm text-gray-600">{recommendations.length} internships match your profile</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <span className="text-2xl">📄</span>
              <div>
                <p className="font-semibold text-gray-800">Profile Updated</p>
                <p className="text-sm text-gray-600">Added {profile.skills.length} skills to profile</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRecommendations = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎯 Recommended Internships</h1>
        <p className="text-gray-600">AI-powered matches based on your skills and preferences</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by company or position..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Locations</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Mumbai</option>
            <option>Pune</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Durations</option>
            <option>3-4 months</option>
            <option>5-6 months</option>
            <option>6+ months</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Sort by Match Score</option>
            <option>Sort by Stipend</option>
            <option>Sort by Duration</option>
          </select>
        </div>
      </div>

      {/* Internship Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map(rec => (
          <div key={rec.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{rec.position}</h3>
                <p className="text-gray-600">{rec.company}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                {rec.match} Match
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📍</span>
                <span>{rec.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">⏱️</span>
                <span>{rec.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">💰</span>
                <span>{rec.stipend}/month</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{rec.description}</p>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Required Skills:</p>
              <div className="flex flex-wrap gap-2">
                {rec.skills.map((skill, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleApply(rec)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderApplications = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 My Applications</h1>
        <p className="text-gray-600">Track and manage your internship applications</p>
      </div>

      {/* Application Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-blue-600">{applications.length}</div>
          <div className="text-gray-600 text-sm">Total Applications</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-yellow-600">{applications.filter(a => a.status === 'Under Review').length}</div>
          <div className="text-gray-600 text-sm">Under Review</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-green-600">{applications.filter(a => a.status === 'Shortlisted').length}</div>
          <div className="text-gray-600 text-sm">Shortlisted</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-red-600">{applications.filter(a => a.status === 'Rejected').length}</div>
          <div className="text-gray-600 text-sm">Rejected</div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow">
        <Table columns={applicationColumns} data={applications} />
      </div>
    </div>
  )

  const renderProfile = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">👤 Skill Profile</h1>
        <p className="text-gray-600">Manage your profile to get better recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.degree}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Profile Strength</span>
              <span className="font-bold text-blue-600">85%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Skills</span>
              <span className="font-bold text-gray-800">{profile.skills.length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">CGPA</span>
              <span className="font-bold text-gray-800">{profile.cgpa}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Year</span>
              <span className="font-bold text-gray-800">{profile.year}</span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium text-gray-800">{profile.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <p className="font-medium text-gray-800">{profile.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">College</label>
                <p className="font-medium text-gray-800">{profile.college}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Degree</label>
                <p className="font-medium text-gray-800">{profile.degree}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Skills</h3>
              <button
                onClick={handleAddSkill}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                + Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Social Links</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-blue-600">🔗</span>
                <span className="text-sm text-gray-800">{profile.linkedIn}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-800">⚡</span>
                <span className="text-sm text-gray-800">{profile.github}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📄 Documents</h1>
        <p className="text-gray-600">Upload and manage your documents for verification</p>
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white">
        <h3 className="text-lg font-bold mb-4">Upload New Document</h3>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 border-2 border-dashed border-white">
          <div className="text-center">
            <div className="text-4xl mb-3">📤</div>
            <p className="mb-4">Drag and drop your files here</p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition">
              Browse Files
            </button>
            <p className="text-sm mt-3 opacity-75">Supported: PDF, JPG, PNG (Max 5MB)</p>
          </div>
        </div>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-blue-600">{documents.length}</div>
          <div className="text-gray-600 text-sm">Total Documents</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-green-600">{documents.filter(d => d.status === 'Verified').length}</div>
          <div className="text-gray-600 text-sm">Verified</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-yellow-600">{documents.filter(d => d.status === 'Pending').length}</div>
          <div className="text-gray-600 text-sm">Pending</div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow">
        <Table columns={documentColumns} data={documents} />
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userRole="student" menuItems={menuItems.map(item => ({
        ...item,
        onClick: () => setCurrentView(item.id)
      }))} />
      
      <div className="flex-1 p-8">
        {currentView === 'overview' && renderOverview()}
        {currentView === 'recommendations' && renderRecommendations()}
        {currentView === 'applications' && renderApplications()}
        {currentView === 'profile' && renderProfile()}
        {currentView === 'documents' && renderDocuments()}
      </div>

      {/* Apply Modal */}
      {showApplyModal && selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Application</h3>
            <div className="mb-6">
              <p className="text-gray-600 mb-2">You are applying for:</p>
              <p className="font-bold text-lg text-gray-800">{selectedInternship.position}</p>
              <p className="text-gray-600">{selectedInternship.company}</p>
              <p className="text-sm text-gray-500 mt-2">Match Score: <span className="font-bold text-green-600">{selectedInternship.match}</span></p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">✅ Your profile matches this internship</p>
              <p className="text-sm text-gray-700">✅ Resume will be sent automatically</p>
              <p className="text-sm text-gray-700">✅ You'll receive updates via email</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowApplyModal(false)
                  setSelectedInternship(null)
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmApply}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
              >
                Confirm Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentDashboard
