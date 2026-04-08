import CheckBackend from "js/utilities/Check-Backend";
import Homepage from "js/homepage.js";

export default {
    title: 'Utilities/CheckBackend',
    component: CheckBackend,
    parameters: {
        docs: {
            description: {
                component: 'CheckBackend utility for PokeIQ <br> Renders the App itself or ServiceDown Component based on backend health',
            },
        },
    },
    argTypes: {
        isUp: {
            control: 'boolean',
            description: 'Simulate whether the backend is reachable',
        },
        healthCheck: {
            control: false,
            table: { disable: true },
            description: 'Function to check backend health'
        },
    },
    args: {
        isUp: false,
    },
    render: ({ isUp }) => {
        const healthCheck = () => Promise.resolve(isUp);
        return (
            <CheckBackend healthCheck={healthCheck}>
                <div className="sb-raw-homepage">
                    <Homepage />
                </div>
            </CheckBackend>
        );
    },
};



export const BackendDown = {
    args: { isUp: false },
    parameters: {
        docs: {
            description: {
                story: 'ServiceDown component appears when backend is down.',
            },
        },
    },
};

export const BackendUp = {
    args: { isUp: true },
    parameters: {
        docs: {
            description: {
                story: 'Children components appear here - Homepage used as an example.',
            },
        },
    },
};

