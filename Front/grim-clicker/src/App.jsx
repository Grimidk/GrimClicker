import * as React from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Routes
 } from 'react-router-dom';

import './App.css';
import Landing from './modules/Landing'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route 
          exact path='/'
          element={<Landing />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
