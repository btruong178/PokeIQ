import About from 'js/about.js';

export default {
    title: 'Pages/About',
    component: About,
    parameters: {
        docs: {
            description: {
                component:
                    'About page for PokeIQ',
            },
        },
    },
};

export const Default = () => (
    <div className="sb-raw-about">
        <About />
    </div>
);