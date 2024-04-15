import React from "react"
import { GameTurn } from "../App"

interface LogProps {
    turns: GameTurn[]
}

export default function Log({ turns }: LogProps): JSX.Element {
    return (
        <ol id="log">
            {turns.map(turn => {
                const { player, square } = turn;
                const { row, col } = square;

                return (
                    <li key={`${row}${col}`}>
                        <span>{player} selected {row}, {col}</span>
                    </li>
                )
            })}
        </ol>
    )
}