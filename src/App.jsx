import React, { useState, useEffect } from 'react'

const Square = ({ value, onSquareClick, winner }) => (
  <button 
    style={{
      width: '80px',
      height: '80px',
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '2px',
      backgroundColor: '#4361ee',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: "'Press Start 2P', cursive",
      animation: winner ? 'pulse 1s infinite' : 'none',
    }}
    onClick={onSquareClick}
  >
    {value}
  </button>
)

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const StartPage = ({ onStart }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(45deg, #7209b7, #3a0ca3, #4361ee, #4cc9f0)',
    color: 'white',
    fontFamily: "'Orbitron', sans-serif",
  }}>
    <h1 style={{ 
      fontSize: '48px', 
      marginBottom: '40px', 
      textShadow: '0 0 10px rgba(255,255,255,0.7)',
    }}>
      Tic Tac Toe
    </h1>
    <button 
      style={{
        padding: '15px 30px',
        fontSize: '18px',
        margin: '10px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '2px solid white',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onClick={() => onStart('friend')}
    >
      Play with Friend
    </button>
    <button 
      style={{
        padding: '15px 30px',
        fontSize: '18px',
        margin: '10px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '2px solid white',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onClick={() => onStart('computer')}
    >
      Play with Computer
    </button>
  </div>
)

const EffectPage = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(45deg, #7209b7, #3a0ca3, #4361ee, #4cc9f0)',
      color: 'white',
      fontFamily: "'Orbitron', sans-serif",
      overflow: 'hidden',
    }}>
      <h1 style={{ 
        fontSize: '64px',
        textShadow: '0 0 20px rgba(255,255,255,0.7)',
        animation: 'pulse 2s infinite',
      }}>
        Get Ready!
      </h1>
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255,255,255,0.7)',
            animation: `sparkle ${Math.random() * 2 + 1}s infinite`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [gameMode, setGameMode] = useState(null)
  const [showEffect, setShowEffect] = useState(false)

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const handleNewGame = () => {
    setGameMode(null)
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const handleStart = (mode) => {
    setGameMode(mode)
    setShowEffect(true)
  }

  const handleEffectComplete = () => {
    setShowEffect(false)
  }

  useEffect(() => {
    if (gameMode === 'computer' && !xIsNext && !calculateWinner(squares)) {
      const emptySquares = squares.reduce((acc, square, index) => 
        square === null ? [...acc, index] : acc, [])
      if (emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length)
        setTimeout(() => handleClick(emptySquares[randomIndex]), 500)
      }
    }
  }, [xIsNext, gameMode, squares])

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (squares.every(Boolean)) {
    status = "It's a draw!"
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  if (!gameMode) {
    return <StartPage onStart={handleStart} />
  }

  if (showEffect) {
    return <EffectPage onComplete={handleEffectComplete} />
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #7209b7, #3a0ca3, #4361ee, #4cc9f0)',
      color: 'white',
      fontFamily: "'Orbitron', sans-serif",
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Press+Start+2P&display=swap');
          
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          @keyframes sparkle {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
      <h1 style={{ 
        fontSize: '36px', 
        fontWeight: 'bold', 
        marginBottom: '24px', 
        textShadow: '0 0 10px rgba(255,255,255,0.7)',
      }}>
        Tic Tac Toe
      </h1>
      <div style={{ 
        marginBottom: '24px', 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: winner ? '#ffd700' : 'white',
        textShadow: '0 0 10px rgba(255,255,255,0.7)',
      }} aria-live="polite">
        {status}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginBottom: '24px' }}>
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} winner={winner === square} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button 
          onClick={handleRestart} 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '2px solid white',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Restart Game
        </button>
        <button 
          onClick={handleNewGame} 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '2px solid white',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          New Game
        </button>
      </div>
    </div>
  )
}

export default TicTacToe