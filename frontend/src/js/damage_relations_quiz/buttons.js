import '../../css/damage_relations_quiz/interface.css';
import { availableTypes } from './logic.js';
import Draggable from './react-dnd/draggable.js';



const Buttons = () => {
    return (
        <div className="button-container">
            <div className="button-display">
                {availableTypes.map((type, index) => (
                    <Draggable key={index} type={type} />
                ))}
            </div>
            <div className="type-effectiveness-chart">

            </div>
        </div>
    );
}

export default Buttons;