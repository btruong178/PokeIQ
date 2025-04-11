import { useEffect } from 'react';
import '../css/SidePanel.css';
import { Link } from "react-router-dom";
import { FaHome, FaQuestionCircle, FaBrain } from 'react-icons/fa';


function SidePanel({ isOpen, toggleSidePanel }) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.side-panel')) {
                toggleSidePanel();
            }
        };

        const mainContent = document.getElementById('root');
        if (mainContent) {
            mainContent.addEventListener('click', handleClickOutside);
        }

        return () => {
            if (mainContent) {
                mainContent.removeEventListener('click', handleClickOutside);
            }
        };
    }, [isOpen]);

    return (
        <div className={`side-panel ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleSidePanel}>×</button>
            <h2 className="title">Navigation</h2>
            <hr />
            <ul>
                <li>
                    <Link to="/" onClick={toggleSidePanel}>
                        <FaHome className="fa-icon"></FaHome>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/About" onClick={toggleSidePanel}>
                        <FaQuestionCircle className="fa-icon"></FaQuestionCircle>
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/TypeQuiz" onClick={toggleSidePanel}>
                        <FaBrain className="fa-icon"></FaBrain>
                        Type Quiz
                    </Link>
                </li>
                <li>
                    <Link to="/Damage_Relations_Quiz" onClick={toggleSidePanel}>
                        <FaBrain className="fa-icon"></FaBrain>
                        Dmg Relations
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SidePanel;