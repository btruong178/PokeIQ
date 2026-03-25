/**
 * @file
 * Component that checks backend connectivity before rendering any part of the application
 * As well as display a loading screen while the check is being performed
 * Will display a "Service Down" message if the backend is not reachable
 * 
 * Responsibilities:
 * - Check backend connectivity on initial load and whenever the route changes
 * - Display a loading screen while the connectivity check is in progress
 * - Render child components if the backend is reachable, otherwise render a service down component
 * 
 * @module Utilities-CheckBackend
 */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/utilities/check-backend.css';
import axios from 'axios';
import ServiceDown from './Service-Down';

/**
 * @component
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