import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            PM Internship Scheme
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12 opacity-90">
            AI-Based Smart Allocation Engine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-white">
            <div className="text-4xl mb-4">👨‍🎓</div>
            <h3 className="text-2xl font-bold mb-3">For Students</h3>
            <p className="opacity-90">
              Create your skill profile, get AI-powered internship recommendations, and track your applications seamlessly.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-white">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold mb-3">For Organizations</h3>
            <p className="opacity-90">
              Post internship opportunities, receive AI-matched candidates, and manage applications efficiently.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-white">
            <div className="text-4xl mb-4">👨‍💼</div>
            <h3 className="text-2xl font-bold mb-3">For Admins</h3>
            <p className="opacity-90">
              Monitor allocation statistics, oversee matching algorithms, and ensure fair distribution of opportunities.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-10 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h4 className="font-bold text-lg">AI-Powered Matching</h4>
                <p className="opacity-90">Intelligent algorithms match students with ideal internship opportunities</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📊</span>
              <div>
                <h4 className="font-bold text-lg">Smart Analytics</h4>
                <p className="opacity-90">Real-time tracking of allocation statistics and success metrics</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h4 className="font-bold text-lg">Skill-Based Matching</h4>
                <p className="opacity-90">Advanced matching based on skills, preferences, and requirements</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h4 className="font-bold text-lg">Secure & Fair</h4>
                <p className="opacity-90">Transparent allocation process with government-grade security</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-yellow-400 bg-opacity-20 backdrop-blur-lg border-2 border-yellow-300 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
            <span>🎯</span>
            <span>Try Demo Access</span>
          </h2>
          <p className="text-center mb-6 opacity-90">
            Explore all features with our demo accounts - no registration required!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="font-bold mb-2">👨‍🎓 Student Demo</p>
              <p className="opacity-90">View recommendations, track applications, and explore AI matching</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="font-bold mb-2">🏢 Organization Demo</p>
              <p className="opacity-90">Post internships, review AI-matched candidates, manage applications</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="font-bold mb-2">👨‍💼 Admin Demo</p>
              <p className="opacity-90">Monitor system stats, oversee allocations, manage organizations</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-block bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition shadow-lg hover:shadow-xl"
            >
              Access Demo Dashboards →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
