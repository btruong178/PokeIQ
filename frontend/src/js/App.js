/**
 * @file
 * Root Component for PokeIQ.
 * @module App
 */

// Library
import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// Component
import Homepage from './homepage.js';
import About from './about.js';
import DamageRelationsQuiz from './Damage-Relations-Quiz/Components/Quiz.js';
import Header from './header.js';
import CheckBackend from './utilities/Check-Backend.js';
import CustomDragLayer from './Damage-Relations-Quiz/React-dnd/DND/Custom-Drag-Layer.js';
// CSS
import '../css/App.css';
// Bootswatch
import 'bootswatch/dist/darkly/bootstrap.min.css';

/**
 * @memberof module:App
 * @description
 * Root component that composes global providers and top-level routes. <br>
 * @returns {JSX.Element} The root app layout with global providers and route configuration.
 */
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
              <Route path="/Damage_Relations_Quiz" element={<DamageRelationsQuiz />} />
            </Routes>
            <CustomDragLayer />
          </main>
        </DndProvider>
      </CheckBackend>
    </div>
  );
}

export default App;
