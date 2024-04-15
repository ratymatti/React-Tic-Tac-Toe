import React from "react"
import { GameTurn } from "../types/types"

interface LogProps {
    turns: GameTurn[]
}

export default function Log({ turns }: LogProps): JSX.Element {

    if (!turns) return <p>Loading...</p>

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