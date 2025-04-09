// Library imports
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
// Component imports
import Homepage from './homepage';
import About from './about';
import TypeQuiz from './type_quiz';
import { Header } from './header';
import { Footer } from './footer';
import CheckBackend from './check_backend';
// CSS imports
import '../css/App.css';

function App() {
  return (
    <div className="App">
      <CheckBackend>
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/About" element={<About />} />
            <Route path="/TypeQuiz" element={<TypeQuiz />} />
          </Routes>
        </main>
      </CheckBackend>
    </div>
  );
}

export default App;
