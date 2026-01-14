import { useState } from 'react'
import './AvatarBuilder.css'

const BASE_OPTIONS = [
  { id: 'circle', label: 'Circle' },
  { id: 'square', label: 'Square' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'oval', label: 'Oval' }
]

const COLOR_OPTIONS = [
  { id: '#646cff', label: 'Purple' },
  { id: '#4ade80', label: 'Green' },
  { id: '#f472b6', label: 'Pink' },
  { id: '#fbbf24', label: 'Gold' },
  { id: '#60a5fa', label: 'Blue' },
  { id: '#f87171', label: 'Coral' }
]

const ACCESSORIES = {
  hats: [
    { id: null, label: 'None', emoji: '❌' },
    { id: 'cap', label: 'Cap', emoji: '🧢' },
    { id: 'beanie', label: 'Beanie', emoji: '🎿' },
    { id: 'cowboy', label: 'Cowboy', emoji: '🤠' },
    { id: 'crown', label: 'Crown', emoji: '👑' },
    { id: 'tophat', label: 'Top Hat', emoji: '🎩' }
  ],
  glasses: [
    { id: null, label: 'None', emoji: '❌' },
    { id: 'round', label: 'Round', emoji: '👓' },
    { id: 'square', label: 'Square', emoji: '🤓' },
    { id: 'sunglasses', label: 'Shades', emoji: '😎' },
    { id: 'monocle', label: 'Monocle', emoji: '🧐' },
    { id: 'star', label: 'Star', emoji: '⭐' }
  ],
  badges: [
    { id: null, label: 'None', emoji: '❌' },
    { id: 'star', label: 'Star', emoji: '⭐' },
    { id: 'heart', label: 'Heart', emoji: '❤️' },
    { id: 'lightning', label: 'Lightning', emoji: '⚡' },
    { id: 'diamond', label: 'Diamond', emoji: '💎' }
  ],
  frames: [
    { id: 'simple', label: 'Simple', emoji: '⬜' },
    { id: 'ornate', label: 'Ornate', emoji: '🖼️' },
    { id: 'neon', label: 'Neon', emoji: '💫' },
    { id: 'pixel', label: 'Pixel', emoji: '🎮' }
  ]
}

// Unlockable items based on trophies
const UNLOCKABLES = {
  champion: { type: 'hats', item: { id: 'champion', label: 'Champion Crown', emoji: '👸' }, trophy: 'Century Club' },
  golden: { type: 'glasses', item: { id: 'golden', label: 'Golden Shades', emoji: '🌟' }, trophy: 'Monthly Master' },
  explorer: { type: 'badges', item: { id: 'explorer', label: 'Explorer Badge', emoji: '🏆' }, trophy: 'all_explorer' },
  trophy: { type: 'frames', item: { id: 'trophy', label: 'Trophy Frame', emoji: '🏅' }, trophy: 'five_total' }
}

function AvatarBuilder({ currentConfig, onSave, onClose, earnedTrophies }) {
  const [config, setConfig] = useState({ ...currentConfig })
  const [activeTab, setActiveTab] = useState('base')

  const tabs = [
    { id: 'base', label: 'Base' },
    { id: 'color', label: 'Color' },
    { id: 'hats', label: 'Hats' },
    { id: 'glasses', label: 'Glasses' },
    { id: 'badges', label: 'Badges' },
    { id: 'frames', label: 'Frames' }
  ]

  // Check if an unlockable item is available
  const isUnlocked = (unlockKey) => {
    const unlock = UNLOCKABLES[unlockKey]
    if (!unlock) return false

    if (unlock.trophy === 'all_explorer') {
      const explorerTrophies = ['Dashboard Explorer', 'Profile Pro', 'Settings Sleuth', 'Widget Wizard']
      return explorerTrophies.every(t => earnedTrophies.includes(t))
    }
    if (unlock.trophy === 'five_total') {
      return earnedTrophies.length >= 5
    }
    return earnedTrophies.includes(unlock.trophy)
  }

  // Get accessory options with unlockables added
  const getOptions = (category) => {
    const baseOptions = [...ACCESSORIES[category]]

    // Add unlockable items if unlocked
    Object.entries(UNLOCKABLES).forEach(([key, unlock]) => {
      if (unlock.type === category && isUnlocked(key)) {
        baseOptions.push({ ...unlock.item, unlocked: true })
      }
    })

    // Add locked items for display
    Object.entries(UNLOCKABLES).forEach(([key, unlock]) => {
      if (unlock.type === category && !isUnlocked(key)) {
        baseOptions.push({ ...unlock.item, locked: true, requirement: unlock.trophy })
      }
    })

    return baseOptions
  }

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const frameStyles = {
    simple: '3px solid rgba(255, 255, 255, 0.3)',
    ornate: '4px double #646cff',
    neon: '3px solid #646cff',
    pixel: '4px solid #646cff',
    trophy: '4px solid gold'
  }

  const hatEmojis = {
    cap: '🧢', beanie: '🎿', cowboy: '🤠', crown: '👑', tophat: '🎩', champion: '👸'
  }

  const glassesEmojis = {
    round: '👓', square: '🤓', sunglasses: '😎', monocle: '🧐', star: '⭐', golden: '🌟'
  }

  const badgeEmojis = {
    star: '⭐', heart: '❤️', lightning: '⚡', diamond: '💎', explorer: '🏆'
  }

  return (
    <div className="builder-overlay" onClick={onClose}>
      <div className="builder-modal" onClick={e => e.stopPropagation()}>
        <div className="builder-header">
          <h2>Customize Avatar</h2>
          <button onClick={onClose} className="close-x">×</button>
        </div>

        <div className="builder-content">
          {/* Live Preview */}
          <div className="builder-preview">
            <div
              className="preview-avatar"
              style={{
                backgroundColor: config.color,
                borderRadius: config.base === 'circle' ? '50%' :
                             config.base === 'square' ? '15%' :
                             config.base === 'rounded' ? '30%' : '40%',
                border: frameStyles[config.frame] || frameStyles.simple,
                boxShadow: config.frame === 'neon' ? `0 0 20px ${config.color}, 0 0 40px ${config.color}40` : 'none'
              }}
            >
              {config.hat && <span className="preview-hat">{hatEmojis[config.hat]}</span>}
              <span className="preview-face">
                {config.glasses ? glassesEmojis[config.glasses] : '😊'}
              </span>
              {config.badge && <span className="preview-badge">{badgeEmojis[config.badge]}</span>}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="builder-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Options Grid */}
          <div className="options-grid">
            {activeTab === 'base' && BASE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className={`option-btn ${config.base === opt.id ? 'selected' : ''}`}
                onClick={() => updateConfig('base', opt.id)}
              >
                <div
                  className="shape-preview"
                  style={{
                    borderRadius: opt.id === 'circle' ? '50%' :
                                 opt.id === 'square' ? '15%' :
                                 opt.id === 'rounded' ? '30%' : '40%'
                  }}
                />
                <span>{opt.label}</span>
              </button>
            ))}

            {activeTab === 'color' && COLOR_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className={`option-btn ${config.color === opt.id ? 'selected' : ''}`}
                onClick={() => updateConfig('color', opt.id)}
              >
                <div className="color-preview" style={{ backgroundColor: opt.id }} />
                <span>{opt.label}</span>
              </button>
            ))}

            {activeTab === 'hats' && getOptions('hats').map(opt => (
              <button
                key={opt.id || 'none'}
                className={`option-btn ${config.hat === opt.id ? 'selected' : ''} ${opt.locked ? 'locked' : ''} ${opt.unlocked ? 'unlocked' : ''}`}
                onClick={() => !opt.locked && updateConfig('hat', opt.id)}
                disabled={opt.locked}
                title={opt.locked ? `Unlock: ${opt.requirement}` : opt.label}
              >
                <span className="option-emoji">{opt.emoji}</span>
                <span>{opt.label}</span>
                {opt.locked && <span className="lock-icon">🔒</span>}
              </button>
            ))}

            {activeTab === 'glasses' && getOptions('glasses').map(opt => (
              <button
                key={opt.id || 'none'}
                className={`option-btn ${config.glasses === opt.id ? 'selected' : ''} ${opt.locked ? 'locked' : ''} ${opt.unlocked ? 'unlocked' : ''}`}
                onClick={() => !opt.locked && updateConfig('glasses', opt.id)}
                disabled={opt.locked}
                title={opt.locked ? `Unlock: ${opt.requirement}` : opt.label}
              >
                <span className="option-emoji">{opt.emoji}</span>
                <span>{opt.label}</span>
                {opt.locked && <span className="lock-icon">🔒</span>}
              </button>
            ))}

            {activeTab === 'badges' && getOptions('badges').map(opt => (
              <button
                key={opt.id || 'none'}
                className={`option-btn ${config.badge === opt.id ? 'selected' : ''} ${opt.locked ? 'locked' : ''} ${opt.unlocked ? 'unlocked' : ''}`}
                onClick={() => !opt.locked && updateConfig('badge', opt.id)}
                disabled={opt.locked}
                title={opt.locked ? `Unlock: ${opt.requirement}` : opt.label}
              >
                <span className="option-emoji">{opt.emoji}</span>
                <span>{opt.label}</span>
                {opt.locked && <span className="lock-icon">🔒</span>}
              </button>
            ))}

            {activeTab === 'frames' && getOptions('frames').map(opt => (
              <button
                key={opt.id}
                className={`option-btn ${config.frame === opt.id ? 'selected' : ''} ${opt.locked ? 'locked' : ''} ${opt.unlocked ? 'unlocked' : ''}`}
                onClick={() => !opt.locked && updateConfig('frame', opt.id)}
                disabled={opt.locked}
                title={opt.locked ? `Unlock: ${opt.requirement}` : opt.label}
              >
                <span className="option-emoji">{opt.emoji}</span>
                <span>{opt.label}</span>
                {opt.locked && <span className="lock-icon">🔒</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="builder-footer">
          <button onClick={onClose} className="cancel-btn glow-btn">Cancel</button>
          <button onClick={() => onSave(config)} className="save-btn glow-btn">Save Avatar</button>
        </div>
      </div>
    </div>
  )
}

export default AvatarBuilder
