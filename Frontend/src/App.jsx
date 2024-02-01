import { useState } from 'react'
import logo from "./components/logo/logo.jsx"
import './App.css'
import mycontext from './contexts/mycontext.jsx';
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <>
        <logo />
      
    </>
  )
}

export default App
