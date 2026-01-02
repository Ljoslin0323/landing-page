import { useState } from 'react'
import Popup from './components/Popup'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowPopup(true)
    setUsername('')
    setEmail('')
  }

  const closePopup = () => {
    setShowPopup(false)
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
