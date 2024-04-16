import React, { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"

import {
    GameBoardType,
    GameState,
    PlayerNames,
    PlayerSymbol
} from "../src/types/types"

import { functions } from "./functions/gameLogic"

const {
    updateTurns,
    updateBoard,
    updatePoints,
    determineWinner
} = functions;

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
    gamePoints: { xPoints: 0, oPoints: 0 }
};

const initialPlayers = {
    [PlayerSymbol.X]: "Player 1",
    [PlayerSymbol.O]: "Player 2"
};


function App() {
    const [gameState, setGameState] = useState<GameState>(JSON.parse(JSON.stringify(initialGameState)));
    const [players, setPlayers] = useState<PlayerNames>(initialPlayers);

    function handleSelectSquare(rowIndex: number, colIndex: number) {
        setGameState((prevState) => {
            const newCurrentPlayer = prevState.currentPlayer === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
            const updatedTurns = updateTurns(prevState, rowIndex, colIndex);
            const newBoard = updateBoard(prevState, rowIndex, colIndex);
            const updatedPoints = updatePoints(prevState, newBoard, updatedTurns);
            const isWinner = determineWinner(updatedPoints, updatedTurns);

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
        setPlayers((prevNames) => {
            return {
                ...prevNames,
                [player]: newName
            }
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={players[PlayerSymbol.X]}
                        symbol={PlayerSymbol.X}
                        isActive={gameState.currentPlayer === PlayerSymbol.X}
                        handlePlayerNameChange={handlePlayerNameChange} />
                    <Player
                        initialName={players[PlayerSymbol.O]}
                        symbol={PlayerSymbol.O}
                        isActive={gameState.currentPlayer === PlayerSymbol.O}
                        handlePlayerNameChange={handlePlayerNameChange} />
                </ol>
                {gameState.winner &&
                    <GameOver
                        winner={gameState.winner}
                        players={players}
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
