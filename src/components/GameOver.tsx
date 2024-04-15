import React from "react";
import { PlayerSymbol } from "../types/types";

interface GameOverProps {
    winner: PlayerSymbol;
    handleRestart: () => void;
}

export default function GameOver({ winner, handleRestart }: GameOverProps) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>{winner} won!</p>
            <p>
                <button onClick={handleRestart}>Rematch!</button>
            </p>
        </div>
    )
}