/**
 * @file
 * Root application component that composes global providers and top-level routes.
 *
 * Responsibilities:
 * - Gate rendering behind backend health checks
 * - Provide drag-and-drop context for quiz interactions
 * - Define top-level routes for core application pages
 *
 * @module App
 */

// Library imports
import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// Component imports
import Homepage from './Homepage.js';
import About from './About.js';
import DamageRelationsQuiz from './Damage-Relations-Quiz/Components/Quiz.js';
import { Header } from './Header.js';
import CheckBackend from './utilities/Check-Backend.js';
import CustomDragLayer from './Damage-Relations-Quiz/React-dnd/DND/Custom-Drag-Layer.js';
// CSS imports
import '../css/App.css';
// Bootswatch imports
import 'bootswatch/dist/darkly/bootstrap.min.css';

/**
 * @component
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
