import './TrophyShelf.css'

const ALL_TROPHIES = [
  // Streak Milestones
  { id: 'First Spark', emoji: '🔥', category: 'streak', description: '1 day streak' },
  { id: 'Week Warrior', emoji: '🗓️', category: 'streak', description: '7 day streak' },
  { id: 'Monthly Master', emoji: '📅', category: 'streak', description: '30 day streak' },
  { id: 'Century Club', emoji: '💯', category: 'streak', description: '100 day streak' },

  // Explorer Badges
  { id: 'Dashboard Explorer', emoji: '🧭', category: 'explorer', description: 'Visit dashboard 5 times' },
  { id: 'Profile Pro', emoji: '👤', category: 'explorer', description: 'Customize your avatar' },
  { id: 'Settings Sleuth', emoji: '⚙️', category: 'explorer', description: 'Open settings' },
  { id: 'Widget Wizard', emoji: '🪄', category: 'explorer', description: 'Interact with all widgets' },

  // Social Awards
  { id: 'Messenger', emoji: '💬', category: 'social', description: 'Send 10 messages' },
  { id: 'Connector', emoji: '🤝', category: 'social', description: 'View 5 profiles' },
  { id: 'Sharer', emoji: '📤', category: 'social', description: 'Share content 3 times' }
]

function TrophyShelf({ earnedTrophies, onClose }) {
  const categories = [
    { id: 'streak', label: 'Streak Milestones', icon: '🔥' },
    { id: 'explorer', label: 'Explorer Badges', icon: '🧭' },
    { id: 'social', label: 'Social Awards', icon: '🤝' }
  ]

  const isEarned = (trophyId) => earnedTrophies.includes(trophyId)

  const earnedCount = earnedTrophies.length
  const totalCount = ALL_TROPHIES.length

  return (
    <div className="trophy-shelf-container">
      <div className="shelf-header">
        <h2>Trophy Shelf</h2>
        <div className="trophy-stats">
          <span className="earned-count">{earnedCount}</span>
          <span className="total-count">/ {totalCount}</span>
        </div>
        <button onClick={onClose} className="close-shelf-btn glow-btn">Close</button>
      </div>

      <div className="shelf-3d">
        {categories.map(category => (
          <div key={category.id} className="shelf-row">
            <div className="shelf-label">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.label}</span>
            </div>

            <div className="shelf-board">
              <div className="trophies-row">
                {ALL_TROPHIES
                  .filter(t => t.category === category.id)
                  .map(trophy => (
                    <div
                      key={trophy.id}
                      className={`trophy-item ${isEarned(trophy.id) ? 'earned' : 'locked'}`}
                      title={`${trophy.id}: ${trophy.description}`}
                    >
                      <div className="trophy-pedestal">
                        <span className="trophy-emoji">
                          {isEarned(trophy.id) ? trophy.emoji : '❓'}
                        </span>
                      </div>
                      <span className="trophy-name">
                        {isEarned(trophy.id) ? trophy.id : '???'}
                      </span>
                      <span className="trophy-desc">{trophy.description}</span>
                    </div>
                  ))}
              </div>
              <div className="shelf-wood" />
            </div>
          </div>
        ))}
      </div>

      {earnedCount === 0 && (
        <div className="empty-message">
          <p>Your trophy shelf is empty!</p>
          <p>Start exploring features to earn your first trophy.</p>
        </div>
      )}
    </div>
  )
}

export default TrophyShelf
