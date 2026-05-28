import 'css/Damage-Relations-Quiz/Custom-Components/HowToPlay-Modal.css';
import { ClickPopover } from './Popover';

const HowToPlayModal = ({ onClose }) => (
    <div className="htp-modal-overlay" onClick={onClose}>
        <div className="htp-modal-content">
            <h2>How to Play</h2>
            <hr className="separator" />
            <p>
                Drag and drop types to their correct effectiveness zones
            </p>
            <p>
                If on mobile, tap on the dropzone header to select a type for it
            </p>
            <hr className="separator" />
            <h3>Caution!</h3>
            <hr className="separator" />
            <p>
                Refreshing/Randomizing/Reselecting will reset your progress!
            </p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
);

export default HowToPlayModal;