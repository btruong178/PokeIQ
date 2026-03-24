import '../../../css/Damage-Relations-Quiz/Custom-Components/HowToPlay-Modal.css';
import { HoverPopover } from './Popover';

const HowToPlayModal = ({ onClose }) => (
    <div className="htp-modal-overlay">
        <div className="htp-modal-content">
            <h2>How to Play</h2>
            <hr className="separator" />

            <p>
                <HoverPopover
                    header="Tips"
                    text="Click a type to return it to the top of the screen"
                    placement="right"
                    className="htp-popover-inline"
                />
                Drag and drop types to their correct effectiveness zones
            </p>
            <p>
                Click types to send them back to the top of the screen
            </p>

            <button onClick={onClose}>Close</button>
        </div>
    </div>
);

export default HowToPlayModal;