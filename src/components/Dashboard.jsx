import './Dashboard.css'

function Dashboard({ user, onLogout }) {
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
          <span className="welcome-text">Welcome, {user.username}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <nav>
            <ul>
              <li className="active">Home</li>
              <li>Profile</li>
              <li>Settings</li>
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
