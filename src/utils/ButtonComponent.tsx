import React from 'react';

interface ButtonComponentProps extends React.ComponentProps<"button">{
    children?: React.ReactNode,
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
}

export const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonComponentProps>( 
    function ButtonComponent({children, onClick, className, disabled, ...attributs}: ButtonComponentProps, ref) {
        
        // const Tag = attributs.href ? 'a' : 'button'
        return (
            <button
                ref={ref}
                className={className}
                disabled={disabled}
                onClick={onClick}
                {...attributs}
            >
                {children}
            </button>
        )
}) 
