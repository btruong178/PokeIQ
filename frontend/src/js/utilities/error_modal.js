import '../../css/utilities/error_modal.css';

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