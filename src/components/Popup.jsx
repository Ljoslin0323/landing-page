function Popup({ onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <p>Thanks for submitting your email information</p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  )
}

export default Popup
