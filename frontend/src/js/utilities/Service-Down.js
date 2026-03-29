/**
 * @file
 * ServiceDown component for PokeIQ.
 */

import 'css/utilities/service-down.css';

/**
 * @memberof module:Backend-Utils
 * @description
 * Component to display when the backend service is down. <br>
 * @returns {JSX.Element} - The ServiceDown Component
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