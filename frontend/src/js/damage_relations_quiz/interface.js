import '../../css/damage_relations_quiz/interface.css';
import { availableTypes } from './logic.js';
import Draggable from './draggable.js';



const Interface = () => {
    return (
        <div className="interface-container">
            <div className="button-display">
                <Draggable type="Normal" />
            </div>
            <div className="type-effectiveness-chart">

            </div>
        </div>
    );
}

export default Interface;