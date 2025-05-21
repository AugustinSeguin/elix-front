import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './Footer.scss';

interface FooterProps {
    title: string;
}

const Footer: React.FC<FooterProps> = ({ title }) => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-icon-title">
                    <FaHeart className="footer-icon" />
                    <h3 className="footer-title">{title}</h3>
                </div>
                <nav className="footer-nav">
                    <ul>
                        <li><a href="#">Mentions légales</a></li>
                        <li><a href="#">RGPD</a></li>
                        <li><a href="#">Qui sommes-nous ?</a></li>
                        <li><a href="#">Le projet Elix</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
