import React from 'react';
import { FaBars } from 'react-icons/fa';
import './Header.scss';

interface HeaderProps {
    title: string;
    onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
    return (
        <header className="header">
            <div className="menu-icon" onClick={onMenuClick}>
                <FaBars />
            </div>
            <h1 className="header-title">{title}</h1>
        </header>
    );
};

export default Header;
