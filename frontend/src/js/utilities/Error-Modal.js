/**
 * @file
 * ErrorModal component for PokeIQ
 * 
 * Responsibilities:
 * - Display an error message in a modal overlay
 * - Provide a user-friendly interface for error notifications
 * 
 * @module Utilities-ErrorModal
 */
import '../../css/Utilities/error-modal.css';

/**
 * @component
 * @description
 * A simple React component that displays an error message in a modal overlay.
 * This component is designed to provide a user-friendly interface for error notifications within the application.
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