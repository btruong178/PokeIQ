// Library imports
import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// Component imports
import Homepage from './homepage';
import About from './about';
import DamageRelationsQuiz from './Damage-Relations-Quiz/Components/Quiz.js';
import { Header } from './header';
import CheckBackend from './Utilities/Check-Backend.js';
import CustomDragLayer from './Damage-Relations-Quiz/React-dnd/Custom-Drag-Layer.js';
// CSS imports
import '../css/App.css';
// Bootswatch imports
import 'bootswatch/dist/darkly/bootstrap.min.css';

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
