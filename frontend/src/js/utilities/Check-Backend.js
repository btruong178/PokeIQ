/**
 * @file
 * Module for backend utilities for PokeIQ. <br>
 * @module Backend-Utils
 */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'css/utilities/check-backend.css';
import axios from 'axios';
import ServiceDown from 'js/utilities/Service-Down.js';

/**
 * @memberof module:Backend-Utils
 * @description
 * Component that: <br>
 * 1. Checks the connectivity to the backend API when components mount or when the route changes. <br>
 * 2. Displays a loading spinner while checking the connection. <br>
 * 3. Renders web app components if the backend is reachable, or shows a ServiceDown component if it is not.
 * @param {object} props - The props object
 * @param {React.ReactNode} props.children - The child components to render if the backend is reachable
 * @returns {JSX.Element} The CheckBackend component
 */
const CheckBackend = ({ children }) => {
    const location = useLocation();
    const [backendUp, setBackendUp] = useState(null);

    const checkAPIConnection = async () => {
        try {
            const response = await axios.get(`/dynamoDB-api/health-check`);
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