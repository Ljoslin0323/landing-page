import { useState } from 'react'
import './Settings.css'

function ToggleSwitch({ label, description, enabled, onToggle }) {
  return (
    <div className="toggle-row">
      <div className="toggle-info">
        <span className="toggle-label">{label}</span>
        <span className="toggle-description">{description}</span>
      </div>
      <button
        className={`toggle-switch ${enabled ? 'enabled' : ''}`}
        onClick={onToggle}
        aria-pressed={enabled}
      >
        <span className="toggle-knob" />
      </button>
    </div>
  )
}

function Settings({ onBack, settings, onSettingsChange, onFeatureUse }) {
  const handleToggle = (key) => {
    onSettingsChange({ ...settings, [key]: !settings[key] })
    if (onFeatureUse) {
      onFeatureUse('settings')
    }
  }

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Settings</h1>
        <button onClick={onBack} className="back-btn glow-btn">
          Back to Dashboard
        </button>
      </header>

      <div className="settings-content">
        <div className="settings-card">
          <h2>Preferences</h2>

          <ToggleSwitch
            label="Dark Mode"
            description="Use dark theme throughout the app"
            enabled={settings.darkMode}
            onToggle={() => handleToggle('darkMode')}
          />

          <ToggleSwitch
            label="Notifications"
            description="Receive alerts for achievements and updates"
            enabled={settings.notifications}
            onToggle={() => handleToggle('notifications')}
          />

          <ToggleSwitch
            label="Sound Effects"
            description="Play sounds for interactions and rewards"
            enabled={settings.soundEffects}
            onToggle={() => handleToggle('soundEffects')}
          />
        </div>

        <div className="settings-card">
          <h2>About</h2>
          <p className="about-text">
            Landing Page Demo App<br />
            Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings
