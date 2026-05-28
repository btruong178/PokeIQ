/**
 * @file
 * Modal component for unselected types
 * Used only for mobile users as the drag and drop functionality is replaced with tap to select for them. <br>
 */
import 'css/Damage-Relations-Quiz/React-dnd/DND/UnSelected-Modal.css';
/**
 * @memberof module:DamageRelations-ReactDND
 * @description
 * UnSelectedModal is a React component that renders a modal for unselected types on mobile devices. <br>
 */
const UnSelectedModal = ({ OnClose }) => (
    <div className="unselected-modal">
        <h2>Unselected Types</h2>
        <p>Tap on a dropzone header to select a type for it.</p>
    </div>
);

export default UnSelectedModal;