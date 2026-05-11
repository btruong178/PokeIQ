import 'css/Damage-Relations-Quiz/Custom-Components/HowToPlay-Modal.css';
import { ClickPopover } from './Popover';

const HowToPlayModal = ({ onClose }) => (
    <div className="htp-modal-overlay">
        <div className="htp-modal-content">
            <span>
                <h2>How to Play</h2>
                <ClickPopover
                    header="Tips"
                    text="This is a popover example."
                />
            </span>
            <hr className="separator" />

            <p>
                1. Drag and drop types to their correct effectiveness zones
            </p>
            <h8>Caution!</h8>
            <p>
                Refreshing/Randomizing/Reselecting will reset your progress!
            </p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
);

export default HowToPlayModal;