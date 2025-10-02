import { Link, useLocation } from 'react-router-dom'

function Sidebar({ userRole, menuItems }) {
  const location = useLocation()

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-400 capitalize">{userRole} Panel</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path
          
          // If onClick is provided, render as button
          if (item.onClick) {
            return (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            )
          }
          
          // Otherwise, render as Link
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
