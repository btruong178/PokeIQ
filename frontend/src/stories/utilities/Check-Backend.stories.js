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

export const Default = {
    args: { isUp: false },
    parameters: {
        docs: {
            description: {
                story: 'Depending on if healthCheck returns true or false, either the children components(Homepage used as an example) or the ServiceDown component will be rendered.',
            },
        },
    },
};

export const LoadingState = {
    argTypes: {
        isUp: { control: false, table: { disable: true } },
    },
    parameters: {
        docs: {
            description: {
                story: 'Loading spinner appears while checking backend health.',
            },
        },
    },
    render: () => {
        const healthCheck = () => new Promise(() => { });
        return (
            <CheckBackend healthCheck={healthCheck}>
                <div />
            </CheckBackend>
        );
    },
};
