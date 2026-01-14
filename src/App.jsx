import { useState, useEffect } from 'react'
import Popup from './components/Popup'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Settings from './components/Settings'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [currentView, setCurrentView] = useState('landing')
  const [submittedUser, setSubmittedUser] = useState({ username: '', email: '' })

  // Avatar configuration state
  const [avatarConfig, setAvatarConfig] = useState({
    base: 'circle',
    color: '#646cff',
    hat: null,
    glasses: null,
    badge: null,
    frame: 'simple'
  })

  // Streak tracking state
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    lastActiveDate: null
  })

  // Features used today (resets daily)
  const [featuresUsedToday, setFeaturesUsedToday] = useState([])

  // Earned trophies
  const [earnedTrophies, setEarnedTrophies] = useState([])

  // Track feature counts for trophy unlocking
  const [featureCounts, setFeatureCounts] = useState({
    dashboardVisits: 0,
    messagesCount: 0,
    profileViews: 0,
    sharesCount: 0
  })

  // Settings state
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    soundEffects: false
  })

  // Check and award trophies based on current state
  useEffect(() => {
    const newTrophies = []

    // Streak trophies
    if (streakData.currentStreak >= 1 && !earnedTrophies.includes('First Spark')) {
      newTrophies.push('First Spark')
    }
    if (streakData.currentStreak >= 7 && !earnedTrophies.includes('Week Warrior')) {
      newTrophies.push('Week Warrior')
    }
    if (streakData.currentStreak >= 30 && !earnedTrophies.includes('Monthly Master')) {
      newTrophies.push('Monthly Master')
    }
    if (streakData.currentStreak >= 100 && !earnedTrophies.includes('Century Club')) {
      newTrophies.push('Century Club')
    }

    // Explorer trophies
    if (featureCounts.dashboardVisits >= 5 && !earnedTrophies.includes('Dashboard Explorer')) {
      newTrophies.push('Dashboard Explorer')
    }
    if (featuresUsedToday.includes('avatar') && !earnedTrophies.includes('Profile Pro')) {
      newTrophies.push('Profile Pro')
    }
    if (featuresUsedToday.includes('settings') && !earnedTrophies.includes('Settings Sleuth')) {
      newTrophies.push('Settings Sleuth')
    }
    if (featuresUsedToday.length >= 4 && !earnedTrophies.includes('Widget Wizard')) {
      newTrophies.push('Widget Wizard')
    }

    // Social trophies (demo - can be connected to actual features later)
    if (featureCounts.messagesCount >= 10 && !earnedTrophies.includes('Messenger')) {
      newTrophies.push('Messenger')
    }
    if (featureCounts.profileViews >= 5 && !earnedTrophies.includes('Connector')) {
      newTrophies.push('Connector')
    }
    if (featureCounts.sharesCount >= 3 && !earnedTrophies.includes('Sharer')) {
      newTrophies.push('Sharer')
    }

    if (newTrophies.length > 0) {
      setEarnedTrophies(prev => [...prev, ...newTrophies])
    }
  }, [streakData, featuresUsedToday, featureCounts, earnedTrophies])

  // Handle feature usage tracking
  const handleFeatureUse = (featureId) => {
    // Add to today's features if not already used
    if (!featuresUsedToday.includes(featureId)) {
      setFeaturesUsedToday(prev => [...prev, featureId])

      // Update streak logic
      const today = new Date().toDateString()
      if (streakData.lastActiveDate !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        if (streakData.lastActiveDate === yesterday.toDateString()) {
          // Consecutive day - increment streak
          setStreakData({
            currentStreak: streakData.currentStreak + 1,
            lastActiveDate: today
          })
        } else if (streakData.lastActiveDate === null) {
          // First time - start streak
          setStreakData({
            currentStreak: 1,
            lastActiveDate: today
          })
        } else {
          // Streak broken - reset
          setStreakData({
            currentStreak: 1,
            lastActiveDate: today
          })
        }
      }
    }

    // Update feature counts
    if (featureId === 'dashboard') {
      setFeatureCounts(prev => ({ ...prev, dashboardVisits: prev.dashboardVisits + 1 }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedUser({ username, email })
    setShowPopup(true)
    setUsername('')
    setEmail('')
  }

  const closePopup = () => {
    setShowPopup(false)
    setCurrentView('dashboard')
    handleFeatureUse('dashboard')
  }

  const handleLogout = () => {
    setCurrentView('landing')
    setSubmittedUser({ username: '', email: '' })
  }

  const goToProfile = () => {
    setCurrentView('profile')
    handleFeatureUse('profile')
  }

  const goToDashboard = () => {
    setCurrentView('dashboard')
    handleFeatureUse('dashboard')
  }

  const goToSettings = () => {
    setCurrentView('settings')
    handleFeatureUse('settings')
  }

  if (currentView === 'settings') {
    return (
      <Settings
        onBack={goToDashboard}
        settings={settings}
        onSettingsChange={setSettings}
        onFeatureUse={handleFeatureUse}
      />
    )
  }

  if (currentView === 'profile') {
    return (
      <Profile
        user={submittedUser}
        onLogout={goToDashboard}
        avatarConfig={avatarConfig}
        onAvatarUpdate={setAvatarConfig}
        streakData={streakData}
        featuresUsedToday={featuresUsedToday}
        earnedTrophies={earnedTrophies}
        onFeatureUse={handleFeatureUse}
      />
    )
  }

  if (currentView === 'dashboard') {
    return (
      <Dashboard
        user={submittedUser}
        onLogout={handleLogout}
        onGoToProfile={goToProfile}
        onGoToSettings={goToSettings}
        avatarConfig={avatarConfig}
      />
    )
  }

  return (
    <div className="container">
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {showPopup && <Popup onClose={closePopup} />}
    </div>
  )
}

export default App
