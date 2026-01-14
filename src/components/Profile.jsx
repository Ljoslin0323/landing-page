import { useState } from 'react'
import TrophyShelf from './TrophyShelf'
import AvatarBuilder from './AvatarBuilder'
import './Profile.css'

// Avatar rendering component
function Avatar({ config, size = 120 }) {
  const frameStyles = {
    simple: '3px solid rgba(255, 255, 255, 0.3)',
    ornate: '4px double #646cff',
    neon: '3px solid #646cff',
    pixel: '4px solid #646cff',
    trophy: '4px solid gold'
  }

  const hatEmojis = {
    cap: '🧢',
    beanie: '🎿',
    cowboy: '🤠',
    crown: '👑',
    tophat: '🎩',
    champion: '👸'
  }

  const glassesEmojis = {
    round: '👓',
    square: '🤓',
    sunglasses: '😎',
    monocle: '🧐',
    star: '⭐',
    golden: '🌟'
  }

  const badgeEmojis = {
    star: '⭐',
    heart: '❤️',
    lightning: '⚡',
    diamond: '💎',
    explorer: '🏆'
  }

  return (
    <div
      className="avatar-display"
      style={{
        width: size,
        height: size,
        backgroundColor: config.color,
        borderRadius: config.base === 'circle' ? '50%' :
                     config.base === 'square' ? '15%' :
                     config.base === 'rounded' ? '30%' : '40%',
        border: frameStyles[config.frame] || frameStyles.simple,
        boxShadow: config.frame === 'neon' ? `0 0 15px ${config.color}, 0 0 30px ${config.color}40` : 'none'
      }}
    >
      {config.hat && (
        <span className="avatar-hat">{hatEmojis[config.hat]}</span>
      )}
      <span className="avatar-face">
        {config.glasses ? glassesEmojis[config.glasses] : '😊'}
      </span>
      {config.badge && (
        <span className="avatar-badge">{badgeEmojis[config.badge]}</span>
      )}
    </div>
  )
}

// Streak Tracker Widget
function StreakTracker({ streakData, featuresUsedToday }) {
  const features = [
    { id: 'dashboard', label: 'Viewed Dashboard' },
    { id: 'profile', label: 'Opened Profile' },
    { id: 'avatar', label: 'Customized Avatar' },
    { id: 'trophies', label: 'Viewed Trophies' },
    { id: 'settings', label: 'Changed Settings' }
  ]

  const completedCount = featuresUsedToday.length
  const progressPercent = (completedCount / features.length) * 100

  // Flame size based on streak
  const getFlameSize = () => {
    if (streakData.currentStreak >= 100) return '3rem'
    if (streakData.currentStreak >= 30) return '2.5rem'
    if (streakData.currentStreak >= 7) return '2rem'
    return '1.5rem'
  }

  return (
    <div className="streak-tracker">
      <div className="streak-header">
        <span className="streak-flame" style={{ fontSize: getFlameSize() }}>🔥</span>
        <span className="streak-count">{streakData.currentStreak}</span>
        <span className="streak-label">day streak</span>
      </div>

      <div className="streak-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="progress-text">{completedCount}/5 features today</span>
      </div>

      <div className="streak-checklist">
        {features.map(feature => (
          <div
            key={feature.id}
            className={`checklist-item ${featuresUsedToday.includes(feature.id) ? 'completed' : ''}`}
          >
            <span className="check-icon">
              {featuresUsedToday.includes(feature.id) ? '✓' : '○'}
            </span>
            <span className="check-label">{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Stats Widget
function StatsWidget({ user, stats }) {
  return (
    <div className="stats-widget">
      <h3>Quick Stats</h3>
      <div className="stat-item">
        <span className="stat-label">Username</span>
        <span className="stat-value">{user.username}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Email</span>
        <span className="stat-value">{user.email}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Trophies</span>
        <span className="stat-value">{stats.trophyCount}</span>
      </div>
    </div>
  )
}

function Profile({
  user,
  onLogout,
  avatarConfig,
  onAvatarUpdate,
  streakData,
  featuresUsedToday,
  earnedTrophies,
  onFeatureUse
}) {
  const [showBuilder, setShowBuilder] = useState(false)
  const [showTrophies, setShowTrophies] = useState(false)

  const handleEditAvatar = () => {
    setShowBuilder(true)
    onFeatureUse('avatar')
  }

  const handleViewTrophies = () => {
    setShowTrophies(!showTrophies)
    onFeatureUse('trophies')
  }

  const stats = {
    trophyCount: earnedTrophies.length
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Profile</h1>
        <div className="header-actions">
          <button onClick={onLogout} className="logout-btn glow-btn">
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="orbit-wrapper">
        {/* Central Avatar Hub */}
        <div className="orbit-center">
          <div className="avatar-ring">
            <Avatar config={avatarConfig} size={140} />
          </div>
          <h2 className="avatar-name">{user.username}</h2>
          <button onClick={handleEditAvatar} className="edit-avatar-btn glow-btn">
            Customize
          </button>
        </div>

        {/* Orbital Widgets */}
        <div className="orbit-widget streak-widget" data-position="top">
          <StreakTracker
            streakData={streakData}
            featuresUsedToday={featuresUsedToday}
          />
        </div>

        <div className="orbit-widget trophies-widget" data-position="right">
          <div className="widget-header">
            <h3>Trophies</h3>
            <button onClick={handleViewTrophies} className="expand-btn glow-btn">
              {showTrophies ? 'Hide' : 'View All'}
            </button>
          </div>
          <div className="trophy-preview">
            <span className="trophy-count">{earnedTrophies.length}</span>
            <span className="trophy-icon">🏆</span>
          </div>
        </div>

        <div className="orbit-widget stats-widget-container" data-position="bottom">
          <StatsWidget user={user} stats={stats} />
        </div>

        <div className="orbit-widget achievements-widget" data-position="left">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {earnedTrophies.slice(-3).map((trophy, idx) => (
              <div key={idx} className="activity-item">
                <span className="activity-icon">🏅</span>
                <span className="activity-text">Earned "{trophy}"</span>
              </div>
            ))}
            {earnedTrophies.length === 0 && (
              <p className="no-activity">Start exploring to earn trophies!</p>
            )}
          </div>
        </div>
      </div>

      {/* Trophy Shelf Modal */}
      {showTrophies && (
        <div className="modal-overlay" onClick={() => setShowTrophies(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <TrophyShelf
              earnedTrophies={earnedTrophies}
              onClose={() => setShowTrophies(false)}
            />
          </div>
        </div>
      )}

      {/* Avatar Builder Modal */}
      {showBuilder && (
        <AvatarBuilder
          currentConfig={avatarConfig}
          onSave={(newConfig) => {
            onAvatarUpdate(newConfig)
            setShowBuilder(false)
          }}
          onClose={() => setShowBuilder(false)}
          earnedTrophies={earnedTrophies}
        />
      )}
    </div>
  )
}

export default Profile
