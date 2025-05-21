import React from 'react';
import './InputText.scss';

interface InputTextProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
}

const InputText: React.FC<InputTextProps> = ({
    value,
    onChange,
    placeholder = '',
    disabled = false,
    error,
}) => {
    return (
        <div className="input-text-container">
            <input
                type="text"
                className={`input-text ${error ? 'error' : ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default InputText;
