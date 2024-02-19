import { ChangeEvent } from 'react';

export const InputElement = (props: {
    name: string;
    label?: string;
    placeholder: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}) => {
    return (
        <>
            <label htmlFor={props.name}>
                {props.label || props.placeholder}
            </label>
            <input
                type={props.type || 'text'}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onInputChange}
            />
        </>
    );
};
