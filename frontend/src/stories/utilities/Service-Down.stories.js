import ServiceDown from "js/utilities/Service-Down";

export default {
    title: 'Utilities/Service Down',
    component: ServiceDown,
    parameters: {
        docs: {
            description: {
                component: 'Component to display when backend is down.',
            },
        },
    },
};

export const Default = () => <ServiceDown />;