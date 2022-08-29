import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <Link className="ins-link" to="/game">
        New Game
      </Link>
      <Link className="ins-link" to="/rank">
        Rank
      </Link>
      <Link className="ins-link" to="/ins">
        Instruction
      </Link>
    </div>
  )
}

export default Home
