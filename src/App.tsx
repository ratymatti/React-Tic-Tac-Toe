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



const initialGameBoard: GameBoardType = [
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
    gamePoints: { xPoints: 0, oPoints: 0 },
    playerNames: {
        [PlayerSymbol.X]: "Player 1",
        [PlayerSymbol.O]: "Player 2",
        [PlayerSymbol.TIE]: "Tie"
    }
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

    function handlePlayerNameChange(player: PlayerSymbol, newName: string) {
        setGameState((prevState) => {
            return {
                ...prevState,
                playerNames: {
                    ...prevState.playerNames,
                    [player]: newName
                }
            }
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName="Player 1"
                        symbol={PlayerSymbol.X}
                        isActive={gameState.currentPlayer === PlayerSymbol.X}
                        handlePlayerNameChange={handlePlayerNameChange} />
                    <Player
                        initialName="Player 2"
                        symbol={PlayerSymbol.O}
                        isActive={gameState.currentPlayer === PlayerSymbol.O}
                        handlePlayerNameChange={handlePlayerNameChange} />
                </ol>
                {gameState.winner && <GameOver
                    winner={gameState.winner}
                    playerNames={gameState.playerNames}
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
