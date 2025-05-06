// Library imports
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// Component imports
import Homepage from './homepage';
import About from './about';
import TypeQuiz from './type_quiz';
import Damage_Relations_Quiz from './damage_relations_quiz/quiz.js';
import { Header } from './header';
import CheckBackend from './utilities/check_backend';
import CustomDragLayer from './damage_relations_quiz/react-dnd/CustomDragLayer.js';
// CSS imports
import '../css/App.css';
// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <CheckBackend>
        <DndProvider backend={HTML5Backend}>
          <main>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/About" element={<About />} />
              <Route path="/TypeQuiz" element={<TypeQuiz />} />
              <Route path="/Damage_Relations_Quiz" element={<Damage_Relations_Quiz />} />
            </Routes>
            <CustomDragLayer />
          </main>
        </DndProvider>
      </CheckBackend>
    </div>
  );
}

export default App;
