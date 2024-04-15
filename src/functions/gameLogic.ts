import { initialGameBoard } from "../App";
import {
    GameTurn,
    GameBoardType,
    PlayerSymbol,
    GameState,
    Board,
    PointCount
} from "../types/types";


function generateIndices(): number[][][] {
    const indices = [
        // Rows
        ...Array.from({ length: Board.SIZE }, (_, i) => Array.from({ length: Board.SIZE }, (_, j) => [i, j])),
        // Columns
        ...Array.from({ length: Board.SIZE }, (_, i) => Array.from({ length: Board.SIZE }, (_, j) => [j, i])),
        // Diagonals (THESE MUST BE HARDCODED AGAIN IF BOARD SIZE CHANGES)
        [[0, 3], [1, 2], [2, 1], [3, 0]],
        [[0, 2], [1, 1], [2, 0]],
        [[1, 3], [2, 2], [3, 1]],
        [[0, 1], [1, 2], [2, 3]],
        [[1, 0], [2, 1], [3, 2]],
        [[0, 0], [1, 1], [2, 2], [3, 3]]
    ];
    return indices;
}

function getPoints(board: GameBoardType): PointCount {
    const indices = generateIndices();

    const result = countPoints(board, indices);
    
    return { xPoints: result.xPoints, oPoints: result.oPoints };
}

function countPoints(board: GameBoardType, indices: number[][][]): PointCount {
    let xPoints = 0;
    let oPoints = 0;

    for (let i = 0; i < indices.length; i++) {
        let count = 0;
        let currentPlayer: PlayerSymbol | null = null;

        for (const indice of indices[i]) {
            const [row, col] = indice;
            const currentSymbol = board[row][col];

            switch (currentSymbol) {
                case PlayerSymbol.X:
                case PlayerSymbol.O:
                    if (currentPlayer === currentSymbol) {
                        count++;
                    } else {
                        count = 1;
                        currentPlayer = currentSymbol;
                    }
                    break;
                default:
                    count = 0;
                    currentPlayer = null;
            }

            if (count >= Board.POINT) {
                if (currentPlayer === PlayerSymbol.X) {
                    xPoints++;
                } else {
                    oPoints++;
                }
                break;
            }
        }
    }

    return { xPoints, oPoints };
}

function updateTurns(prevState: GameState, rowIndex: number, colIndex: number): GameTurn[] {
    return [
        { square: { row: rowIndex, col: colIndex }, player: prevState.currentPlayer },
        ...prevState.gameTurns
    ];
}

function updateBoard(prevState: GameState, rowIndex: number, colIndex: number): GameBoardType {
    const newBoard = prevState.gameBoard.map(row => [...row]);
    newBoard[rowIndex][colIndex] = prevState.currentPlayer;
    return newBoard;
}

function updatePoints(prevState: GameState, updateBoard: GameBoardType, updatedTurns: GameTurn[]): any {
    let newPoints = {};
    if (updatedTurns.length >= 5) newPoints = getPoints(updateBoard);
    return {
        ...prevState.gamePoints,
        ...newPoints
    };
}

function determineWinner(updatedPoints: any, updatedTurns: GameTurn[]): PlayerSymbol | null {
    if (updatedPoints.xPoints === 3) {
        return PlayerSymbol.X;
    } else if (updatedPoints.oPoints === 3) {
        return PlayerSymbol.O;
    } else if (updatedTurns.length >= 16) {
        return PlayerSymbol.TIE;
    }
    return null;
}

export const functions = { updateTurns, updateBoard, updatePoints, determineWinner };