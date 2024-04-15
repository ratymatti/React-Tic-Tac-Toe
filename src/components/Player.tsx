import React, { useState } from "react";
import Input from "./Input";

import { PlayerSymbol } from "../types/types";

interface PlayerProps {
    initialName: string;
    symbol: PlayerSymbol;
    isActive: boolean;
    handlePlayerNameChange: (player: PlayerSymbol, newName: string) => void;
}

export default function Player({ initialName, symbol, isActive, handlePlayerNameChange }: PlayerProps): JSX.Element {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [playerName, setPlayerName] = useState<string>(initialName);

    function handleClick(): void {
        setIsEditing((prev) => !prev);
        handlePlayerNameChange(symbol, playerName);
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