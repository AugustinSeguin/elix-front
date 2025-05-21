import React from 'react';
import './Icon.scss';

interface IconProps {
    name: string;
    size?: 'small' | 'medium' | 'large';
    color?: string;
    onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ name, size = 'medium', color, onClick }) => {
    return (
        <i
            className={`icon ${name} ${size}`}
            style={{ color }}
            onClick={onClick}
        />
    );
};

export default Icon;
