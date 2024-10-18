import React from 'react';
import './CustomAlert.css'; // Ensure you have the appropriate styles in this CSS file

const CustomAlert = ({ message, onClose, type }) => {
    // Determine the class for alert based on the 'type' prop
    const alertClass = type === 'error' ? 'custom-alert-error' : 'custom-alert-success';

    return (
        <div className="custom-alert-container">
            <div className={`custom-alert ${alertClass}`}>
                <div className="custom-alert-content">
                    <p>{message}</p>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
            </div>
        </div>
    );
};

export default CustomAlert;
