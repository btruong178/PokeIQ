import Header from 'js/header.js';

export default {
    title: 'Pages/Header',
    complex: Header,
    parameters: {
        docs: {
            description: {
                component:
                    'Header component for PokeIQ',
            },
        },
    },
}

export const Default = () => <Header />;