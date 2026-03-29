/**
 * @file
 * ErrorModal component for PokeIQ
 */
import 'css/utilities/error-modal.css';

/**
 * @memberof module:Backend-Utils
 * @description
 * Component to display an error message in a user friendly interface. <br>
 * @param {string} message - The error message to display in the modal
 * @param {function} onClose - A callback function to close the modal when the user clicks the "Close" button
 * @returns {JSX.Element} The ErrorModal component
 */
const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="error-modal-overlay">
            <div className="error-modal-content">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ErrorModal;