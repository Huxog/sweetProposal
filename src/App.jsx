import { useState, useRef, useCallback } from 'react'
import './App.css'

// Configure the number of hearts in the explosion here
const HEART_COUNT = 200

const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🥰', '😍', '💞']

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ position: 'relative', top: 0, left: 0 })
  const [showSuccess, setShowSuccess] = useState(false)
  const [hearts, setHearts] = useState([])
  const noButtonRef = useRef(null)

  const moveNoButton = useCallback(() => {
    const padding = 100
    const buttonWidth = 150
    const buttonHeight = 50

    const maxX = window.innerWidth - buttonWidth - padding
    const maxY = window.innerHeight - buttonHeight - padding

    const newX = Math.random() * maxX + padding / 2
    const newY = Math.random() * maxY + padding / 2

    setNoButtonPosition({
      position: 'fixed',
      top: newY,
      left: newX
    })
  }, [])

  const createHeartExplosion = useCallback(() => {
    const newHearts = []

    for (let i = 0; i < HEART_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const velocity = 0.5 + Math.random() * 1.5

      newHearts.push({
        id: Date.now() + i,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        startX: 50 + (Math.random() - 0.5) * 20,
        delay: Math.random() * 0.8,
        size: 1 + Math.random() * 1.5,
        duration: 2.5 + Math.random() * 2,
        driftX: Math.cos(angle) * velocity * 150,
        driftY: Math.sin(angle) * velocity * 100 - 300,
        rotation: (Math.random() - 0.5) * 720
      })
    }

    setHearts(newHearts)
    setShowSuccess(true)

    // Clean up hearts after animation
    setTimeout(() => {
      setHearts([])
    }, 6000)
  }, [])

  const handleYesClick = () => {
    createHeartExplosion()
  }

  return (
    <div className="proposal-container">
      <h1 className="main-question">Will you be my girlfriend?</h1>

      <div className="paragraphs-container">
        <div className="paragraph-section">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Every moment with you feels like a beautiful dream I never want to wake up from.
          </p>
        </div>

        <div className="paragraph-section">
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            You make my heart skip a beat every single time I see you smile.
            I cannot imagine my life without you by my side.
          </p>
        </div>
      </div>

      <div className="buttons-container">
        <button className="btn btn-yes" onClick={handleYesClick}>
          Yes
        </button>
        <button
          ref={noButtonRef}
          className="btn btn-no"
          onClick={moveNoButton}
          onMouseEnter={moveNoButton}
          style={{
            position: noButtonPosition.position,
            top: noButtonPosition.position === 'fixed' ? noButtonPosition.top : 'auto',
            left: noButtonPosition.position === 'fixed' ? noButtonPosition.left : 'auto'
          }}
        >
          No
        </button>
      </div>

      {/* Heart explosion */}
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.startX}%`,
            bottom: '40%',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}rem`,
            '--drift-x': `${heart.driftX}px`,
            '--drift-y': `${heart.driftY}px`,
            '--rotation': `${heart.rotation}deg`
          }}
        >
          {heart.emoji}
        </span>
      ))}

      {/* Success message */}
      {showSuccess && (
        <div className="success-message">
          I love you!
        </div>
      )}
    </div>
  )
}

export default App
