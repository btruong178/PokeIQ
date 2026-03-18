import Homepage from '../js/homepage.js';

export default {
    title: 'Pages/Homepage',
    component: Homepage,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'The homepage of the PokeIQ application'
            }
        }
    }
}

export const Main = () => <Homepage />;