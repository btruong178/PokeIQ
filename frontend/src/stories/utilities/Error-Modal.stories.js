import ErrorModal from "js/utilities/Error-Modal";
import Homepage from "js/homepage.js";
import About from "js/about.js";

export default {
    title: 'Utilities/Error Modal',
    component: ErrorModal,
    parameters: {
        docs: {
            description: {
                component: 'Component to display error messages.',
            },
        },
    },
};

export const Default = {
    args: {
        message: 'Error message Here',
    },
    render: ({ message }) => <ErrorModal message={message} />,
};

export const HomepageError = {
    args: {
        message: 'Error message Here',
    },
    render: ({ message }) => <div className="sb-raw-homepage"><Homepage /><ErrorModal message={message} /></div>,
}
export const AboutPageError = {
    args: {
        message: 'Error message Here',
    },
    render: ({ message }) => <div className="sb-raw-about"><About /><ErrorModal message={message} /></div>,
}