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

      <div className="paragraphs-container">
        <div className="paragraph-section">
          <p>
            En los últimos días ambos hemos sido testigo de como se ven dos personas dispuestas. A mi me faltan años para convertirme en el hombre que quiero ser, en un hombre que creo que estarás orgullosa de llamar tu pareja. Quiero que sepas que tengo miedo, miedo de no estar a la altura, miedo de no ser suficiente, miedo de fallarte. Pero a pesar de todo eso, quiero no intentarlo si no lograrlo.
          </p>
        </div>

        <div className="paragraph-section">
          <p>
            Quiero que seas mi compañera de vida, quiero que estemos juntos en las buenas y en las malas, en la salud y en la enfermedad, en la riqueza y en la pobreza. Quiero que seas mi mejor amiga, mi confidente, mi cómplice, mi amor, mi todo; quiero que seas una extensión de mi y de mi corazón, de mis emociones, de mis metas y de mis sueños.
          </p>
        </div>
        <div className="paragraph-section">
          <p>
            Sé que lo que estoy pidiendo es invaluable y no pretendo aparentar que no existe el riesgo de que las cosas no salgan bien. Yo quiero ese riesgo, yo quiero ese reto. Yo quiero demostrarnos a los dos que puedo ser alguien que te haga feliz, que te puede ofrecer un espacio seguro siempre que lo necesites, que te va a apoyar a lograr tus metas, que va a celebrar tus logros, que va a estar a tu lado en los momentos de más desesperanza.
          </p>
        </div>
        <div className="paragraph-section">
          <p>
            Aquí, hoy, quiero que sepas que te quiero y que me inspiras a ser una mejor persona para mi pero principalmente para ti. Quiero que seas mi novia. Quiero que estemos juntos y que vivamos una relación que triunfe. Quiero que seas feliz a mi lado.
          </p>
        </div>
      </div>
      <h1 className="main-question">¿Quieres ser mi novia?</h1>

      <div className="buttons-container">
        <button className="btn btn-yes" onClick={handleYesClick}>
          Si
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
          ¡Te amo!
        </div>
      )}
    </div>
  )
}

export default App
