import React from "react";
import { useState } from "react";
import Input from "./Input";

interface PlayerProps {
    initialName: string;
    symbol: string;
    isActive: boolean;
}

export default function Player({ initialName, symbol, isActive }: PlayerProps): JSX.Element {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [playerName, setPlayerName] = useState<string>(initialName);

    function handleClick(): void {
        setIsEditing((prev) => !prev);
    }

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setPlayerName(event.target.value);
    }
    
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {isEditing &&
                    <Input
                        playerName={playerName}
                        onChange={handleNameChange} />
                }
                {!isEditing &&
                    <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
} 