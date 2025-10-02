function Card({ title, value, icon, color = 'blue', subtitle }) {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
    pink: 'from-pink-400 to-pink-600',
    indigo: 'from-indigo-400 to-indigo-600',
    yellow: 'from-yellow-400 to-yellow-600',
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
    </div>
  )
}

export default Card
