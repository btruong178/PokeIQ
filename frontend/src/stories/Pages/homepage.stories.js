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
const className = 'sb-raw-homepage';
export const Default = () => (
    <div className={className}>
        <Homepage />
    </div>
);