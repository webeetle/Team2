import { useState } from 'react'
import Home from "./components/Home/Home.jsx"
import Login from './components/login/log.jsx';
import LyfeCycle from './components/lifecycle/index.jsx';
import CreateTask from "./components/Modal/index.jsx";
import './App.css'
import mycontext from './contexts/mycontext.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/home" Component={Home} />
          <Route path='/lifecycle' Component={LyfeCycle} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
