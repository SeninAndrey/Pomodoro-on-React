import React from 'react';

interface InputComponentProps extends React.ComponentProps<"input"> {
    id: string,
    type: string
    className?: string,
    label?: string | React.JSX.Element,
    labelClassName?: string
}

export const InputComponent = React.forwardRef<HTMLInputElement, InputComponentProps> (
    function InputComponent({id, type, className, label, labelClassName, ...attributs}: InputComponentProps, ref) {
        return (
            <div className={labelClassName}>
                {label && 
                    <label htmlFor={id}>
                        {label}
                    </label>
                }
                <input 
                    name={id}
                    type={type}
                    id={id}
                    ref={ref}
                    className={className}
                    {...attributs}    
                />
            </div>
            
        )
    }
)
