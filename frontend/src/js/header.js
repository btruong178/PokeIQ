import '../css/Header.css';
import { useState } from "react";
import SidePanel from './sidepanel';
import { FaBars, FaBook, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidePanel = () => {
        setIsOpen(!isOpen);
    }


    return (
        <>
            <header className="header">
                <div className="header-left">
                    <FaBars className="FaBars" onClick={toggleSidePanel} title="Toggle Side Panel" />
                    <Link to="/" className="header-title">
                        Pokequiz
                    </Link>
                </div>
                {/* <div className="header-right">
                    <FaBook className="FaBook" title="Homepage Tutorial" />
                    <FaCog className="FaCog" title="Settings" />
                </div> */}
            </header>
            <SidePanel isOpen={isOpen} toggleSidePanel={toggleSidePanel} />
        </>
    );
}