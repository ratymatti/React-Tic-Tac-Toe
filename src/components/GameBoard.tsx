import React from "react";
import { GameBoardType } from "../App";

interface GameBoardProps {
    board: GameBoardType;
    onSelectSquare: (rowIndex: number, colIndex: number) => void;
}

export default function GameBoard({ onSelectSquare, board }:GameBoardProps): JSX.Element {

    if (!board) return <h2>Loading...</h2>

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex} >
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex} className="cell">
                                <button
                                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                                    disabled={playerSymbol !== null}>
                                        {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}