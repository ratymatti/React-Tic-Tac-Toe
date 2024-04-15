import React from "react";
import { PlayerNames, PlayerSymbol } from "../types/types";

interface GameOverProps {
    winner: PlayerSymbol;
    players: PlayerNames;
    handleRestart: () => void;
}

export default function GameOver({ winner, handleRestart, players }: GameOverProps) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner !== PlayerSymbol.TIE && <p>{players[winner]} won!</p>}
            {winner === PlayerSymbol.TIE && <p>It's a tie!</p>}
            <p>
                <button onClick={handleRestart}>Rematch!</button>
            </p>
        </div>
    )
}