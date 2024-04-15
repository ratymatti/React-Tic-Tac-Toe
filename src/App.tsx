import React, { useEffect } from "react"
import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import getPoints from "./functions/getPoints"

export interface GameTurn {
    player: PlayerSymbol;
    square: {
        row: number;
        col: number;
    }
}

export enum PlayerSymbol {
    X = 'X',
    O = 'O'
}

function deriveCurrentPlayer(turns: GameTurn[]): PlayerSymbol {
    let currentPlayer = PlayerSymbol.X;

    if (turns.length > 0 && turns[0].player === PlayerSymbol.X) {
        currentPlayer = PlayerSymbol.O;
    }
    return currentPlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);

    const currentPlayer = deriveCurrentPlayer(gameTurns);

    function handleSelectSquare(rowIndex: number, colIndex: number) {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveCurrentPlayer(prevTurns);

            const updatedTurns = [
                { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
                ...prevTurns
            ];
            return updatedTurns;
        });
    }

    useEffect(() => {
        if (gameTurns.length < 5) {
            return;
        }
        const { xPoints, oPoints } = getPoints(gameTurns);

        if (xPoints === 3) {
            console.log('Player 1 wins!');
        } else if (oPoints === 3) {
            console.log('Player 2 wins!');
        }
    }, [gameTurns]);

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName="Player 1"
                        symbol="X"
                        isActive={currentPlayer === PlayerSymbol.X} />
                    <Player
                        initialName="Player 2"
                        symbol="O"
                        isActive={currentPlayer === PlayerSymbol.O} />
                </ol>
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    turns={gameTurns} />
            </div>
            <Log
                turns={gameTurns} />
        </main>
    )
}

export default App
