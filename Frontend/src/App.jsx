import { useState } from 'react'
import Home from "./components/Home/Home.jsx"
import Greetings from "./components/Greetings/Greetings.jsx";
import './App.css'
import Counter from './components/Greetings/counter/index.jsx';
import mycontext from './contexts/mycontext.jsx';
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <>
        <Home />
      
    </>
  )
}

export default App
