// Library imports
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Component imports
import Homepage from './homepage';
import About from './about';
import TypeQuiz from './type_quiz';
import { Header } from './header';
import { Footer } from './footer';
// CSS imports
import '../css/App.css';

function App() {
  return (

    <>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/About" element={<About />} />
          <Route path="/TypeQuiz" element={<TypeQuiz />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
