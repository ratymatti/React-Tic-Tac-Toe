import React from "react";
import { GameTurn, PlayerSymbol } from "../App";

interface GameBoardProps {
    turns: GameTurn[];
    onSelectSquare: (rowIndex: number, colIndex: number) => void;
}

export type GameBoardType = (PlayerSymbol | null)[][];

export const initialGameBoard: GameBoardType = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

export default function GameBoard({ onSelectSquare, turns }:GameBoardProps): JSX.Element {
    let gameBoard: GameBoardType = initialGameBoard;

    for (const turn of turns) {
        const { player, square } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }


    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
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