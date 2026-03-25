/**
 * @file
 * ServiceDown component for PokeIQ
 * 
 * Responsibilities:
 * - Display a message indicating that the service is currently down
 * - Provide a user-friendly interface during downtime
 * 
 * @module Utilities-ServiceDown
 */

import '../../css/utilities/service-down.css';

/**
 * @component
 * @description
 * A simple React component that displays a message indicating that the service is currently down.
 * This component is to be rendered when the application detects that the backend service is unavailable.
 * @returns {JSX.element} - The ServiceDown Component
 */

const ServiceDown = () => (
    <div className="service-down-container">
        <h1 className="service-down-text">
            Service is down
        </h1>
        <h1 className="service-down-text">
            Try again another time!
        </h1>
    </div>
);

export default ServiceDown;