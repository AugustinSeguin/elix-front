import React from 'react';
import './Button.scss';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    variant = 'primary',
    disabled = false,
}) => {
    return (
        <button
            className={`button ${variant} ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
