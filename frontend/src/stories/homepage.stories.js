import Homepage from 'js/homepage.js';

export default {
    title: 'Pages/Homepage',
    component: Homepage,
    parameters: {
        docs: {
            description: {
                component:
                    'Homepage/Landing page for PokeIQ',
            },
        },
    },
};

export const Default = () => (
    <div className="sb-raw-homepage">
        <Homepage />
    </div>
);