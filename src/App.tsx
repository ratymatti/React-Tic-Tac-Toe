import React, { useEffect } from "react"
import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import  { PointCount, functions } from "./functions/gameLogic"
import GameOver from "./components/GameOver"

export interface GameTurn {
    player: PlayerSymbol;
    square: {
        row: number;
        col: number;
    }
}

export enum PlayerSymbol {
    X = 'X',
    O = 'O',
    TIE = 'TIE'
}

export type GameBoardType = (PlayerSymbol | null)[][];

export const initialGameBoard: GameBoardType = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

const initialGameState = {
    gameTurns: [],
    winner: null,
    gameBoard: JSON.parse(JSON.stringify(initialGameBoard)),
    currentPlayer: PlayerSymbol.X,
    gamePoints: { xPoints: 0, oPoints: 0 }
};

export interface GameState {
    gameTurns: GameTurn[];
    winner: PlayerSymbol | null;
    gameBoard: GameBoardType;
    currentPlayer: PlayerSymbol;
    gamePoints: PointCount;
}

function App() {
    const [gameState, setGameState] = useState<GameState>(JSON.parse(JSON.stringify(initialGameState)));

    function handleSelectSquare(rowIndex: number, colIndex: number) {
        setGameState((prevState) => {
            const newCurrentPlayer = prevState.currentPlayer === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
            const updatedTurns = functions.updateTurns(prevState, rowIndex, colIndex);
            const newBoard = functions.updateBoard(prevState, rowIndex, colIndex);
            const updatedPoints = functions.updatePoints(prevState, updatedTurns);
            const winner = functions.determineWinner(updatedPoints, updatedTurns);
    
            return {
                ...prevState,
                currentPlayer: newCurrentPlayer,
                gameTurns: updatedTurns,
                gameBoard: newBoard,
                gamePoints: updatedPoints,
                winner: winner
            };
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
