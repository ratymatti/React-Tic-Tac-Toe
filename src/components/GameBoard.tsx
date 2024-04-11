import React from "react";

const initialGameBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

export default function GameBoard(): JSX.Element {
    return (
        <ol id="game-board">
            {initialGameBoard.map((row, rowIndex) => (
                <li key={rowIndex} >
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex} className="cell">
                                <button>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}