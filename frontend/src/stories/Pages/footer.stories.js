import Footer from 'js/footer.js';

export default {
    title: 'Pages/Footer',
    component: Footer,
    parameters: {
        docs: {
            description: {
                component:
                    'Footer component for PokeIQ',
            },
        },
    },
}
const className = 'sb-bottom-footer';
export const Default = () => (
    <div className={className}>
        <Footer />
    </div>
);