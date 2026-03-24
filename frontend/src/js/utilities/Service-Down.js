/**
 * @file
 * ServiceDown component for PokeIQ
 * @module ServiceDown
 * @component
 */

import '../../css/utilities/service-down.css';

/**
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