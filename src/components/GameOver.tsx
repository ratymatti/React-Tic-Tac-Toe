import React from "react";
import { PlayerNames, PlayerSymbol } from "../types/types";

interface GameOverProps {
    winner: PlayerSymbol;
    playerNames: PlayerNames;
    handleRestart: () => void;
}

export default function GameOver({ winner, handleRestart, playerNames }: GameOverProps) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>{winner !== PlayerSymbol.TIE ? playerNames[winner].toUpperCase() + " won!" : "It's a tie!"}</p>
            <p>
                <button onClick={handleRestart}>Rematch!</button>
            </p>
        </div>
    )
}