import './Dashboard.css'

// Mini avatar display for header
function MiniAvatar({ config }) {
  const frameStyles = {
    simple: '2px solid rgba(255, 255, 255, 0.3)',
    ornate: '2px double #646cff',
    neon: '2px solid #646cff',
    pixel: '2px solid #646cff',
    trophy: '2px solid gold'
  }

  return (
    <div
      className="mini-avatar"
      style={{
        backgroundColor: config.color,
        borderRadius: config.base === 'circle' ? '50%' :
                     config.base === 'square' ? '15%' :
                     config.base === 'rounded' ? '30%' : '40%',
        border: frameStyles[config.frame] || frameStyles.simple,
        boxShadow: config.frame === 'neon' ? `0 0 8px ${config.color}` : 'none'
      }}
    >
      {config.glasses ? (
        config.glasses === 'sunglasses' ? '😎' :
        config.glasses === 'monocle' ? '🧐' : '🤓'
      ) : '😊'}
    </div>
  )
}

function Dashboard({ user, onLogout, onGoToProfile, onGoToSettings, avatarConfig }) {
  const widgets = [
    { title: 'Profile Views', value: '1,234', icon: '👁️' },
    { title: 'Messages', value: '56', icon: '✉️' },
    { title: 'Projects', value: '12', icon: '📁' },
    { title: 'Tasks', value: '89', icon: '✓' },
  ]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-right">
          {avatarConfig && (
            <button onClick={onGoToProfile} className="avatar-btn">
              <MiniAvatar config={avatarConfig} />
            </button>
          )}
          <span className="welcome-text">Welcome, {user.username}</span>
          <button onClick={onLogout} className="logout-btn glow-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <nav>
            <ul>
              <li className="active">Home</li>
              <li className="nav-link" onClick={onGoToProfile}>Profile</li>
              <li className="nav-link" onClick={onGoToSettings}>Settings</li>
              <li>Analytics</li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          <div className="user-info">
            <p>Logged in as: <strong>{user.email}</strong></p>
          </div>

          <div className="widgets-grid">
            {widgets.map((widget, index) => (
              <div key={index} className="widget">
                <span className="widget-icon">{widget.icon}</span>
                <div className="widget-info">
                  <h3>{widget.title}</h3>
                  <p className="widget-value">{widget.value}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
