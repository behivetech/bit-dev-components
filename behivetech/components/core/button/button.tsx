import React from 'react';

export type ButtonProps = {
    /**
     * children to be rendered in the component.
     */
    children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...restProps }: ButtonProps) {
    return (
        <button  {...restProps} className={`button ${className || ''}`}>
            {children}
        </button>
    );
}
