import React from 'react';

interface InputProps {
    playerName: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

export default function Input({ playerName, onChange }: InputProps): JSX.Element {
    return (
        <>
            <input
                type='text'
                required
                value={playerName}
                onChange={onChange} />
        </>
    )
}