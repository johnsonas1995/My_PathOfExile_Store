import { useState } from 'react'
import chaosLogo from './assets/chaos.jpeg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
          <img src={chaosLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Some Call it Junk</h1>
      <div className="card">
        
      </div>
      
    </div>
  )
}

export default App
