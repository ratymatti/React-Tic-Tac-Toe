import React, { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"

import { functions } from "./functions/gameLogic"

import {
    GameBoardType,
    GameState,
    PlayerSymbol
} from "../src/types/types"



export const initialGameBoard: GameBoardType = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

const initialGameState: GameState = {
    gameTurns: [],
    winner: null,
    gameBoard: JSON.parse(JSON.stringify(initialGameBoard)),
    currentPlayer: PlayerSymbol.X,
    gamePoints: { xPoints: 0, oPoints: 0 }
};


function App() {
    const [gameState, setGameState] = useState<GameState>(JSON.parse(JSON.stringify(initialGameState)));

    function handleSelectSquare(rowIndex: number, colIndex: number) {
        setGameState((prevState) => {
            const newCurrentPlayer = prevState.currentPlayer === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
            const updatedTurns = functions.updateTurns(prevState, rowIndex, colIndex);
            const newBoard = functions.updateBoard(prevState, rowIndex, colIndex);
            const updatedPoints = functions.updatePoints(prevState, newBoard, updatedTurns);
            const isWinner = functions.determineWinner(updatedPoints, updatedTurns);

            return {
                ...prevState,
                currentPlayer: newCurrentPlayer,
                gameTurns: updatedTurns,
                gameBoard: newBoard,
                gamePoints: updatedPoints,
                winner: isWinner
            }
        });
    }

    function handleRestart() {
        setGameState(JSON.parse(JSON.stringify(initialGameState)));
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName="Player 1"
                        symbol="X"
                        isActive={gameState.currentPlayer === PlayerSymbol.X} />
                    <Player
                        initialName="Player 2"
                        symbol="O"
                        isActive={gameState.currentPlayer === PlayerSymbol.O} />
                </ol>
                {gameState.winner && <GameOver
                    winner={gameState.winner}
                    handleRestart={handleRestart} />}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameState.gameBoard} />
            </div>
            <Log
                turns={gameState.gameTurns} />
        </main>
    )
}

export default App
