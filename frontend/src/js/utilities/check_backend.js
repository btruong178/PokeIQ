import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/utilities/check_backend.css';
import axios from 'axios';
import ServiceDown from './service_down';

const CheckBackend = ({ children }) => {
    const location = useLocation();
    const [backendUp, setBackendUp] = useState(null);

    const checkAPIConnection = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/health-check`);
            setBackendUp(response.status === 200);
        } catch (err) {
            setBackendUp(false);
        }
    };

    useEffect(() => {
        setBackendUp(null);
        checkAPIConnection();
    }, [location]);

    if (backendUp === null)
        return (
            <div className="loading-container">
                <h1 className="loading-text">Loading</h1>
                <div className="spinning-circle"></div>
            </div>
        );

    return backendUp ? children : <ServiceDown />;
};

export default CheckBackend;