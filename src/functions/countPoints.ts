import { GameTurn } from "../App";
import { PlayerSymbol } from "../App";
import { GameBoardType, initialGameBoard } from "../components/GameBoard";

enum Board {
    SIZE = 4,
    POINT = 3
}

interface PointCount {
    xPoints: number;
    oPoints: number;
}


export default function countPoints(turns: GameTurn[]): PointCount {
    let gameBoard: GameBoardType = initialGameBoard;

    for (const turn of turns) {
        const { player, square } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    const result = iterateIndices(gameBoard);

    return { xPoints: result.xPoints, oPoints: result.oPoints };
}

function iterateIndices(board: GameBoardType): PointCount {
    let xPoints = 0;
    let oPoints = 0;

    const indices = [
        // Rows
        ...Array.from({ length: Board.SIZE }, (_, i) => Array.from({ length: Board.SIZE }, (_, j) => [i, j])),
        // Columns
        ...Array.from({ length: Board.SIZE }, (_, i) => Array.from({ length: Board.SIZE }, (_, j) => [j, i])),
        // Diagonals
        [[0, 3], [1, 2], [2, 1], [3, 0]],
        [[0, 2], [1, 1], [2, 0]],
        [[1, 3], [2, 2], [3, 1]],
        [[0, 1], [1, 2], [2, 3]],
        [[1, 0], [2, 1], [3, 2]],
        [[0, 0], [1, 1], [2, 2], [3, 3]]
    ];

    for (let i = 0; i < indices.length; i++) {
        let xCount = 0;
        let oCount = 0;

        for (const indice of indices[i]) {
            const [row, col] = indice;
            if (board[row][col] === PlayerSymbol.X) {
                xCount++;
            } else if (board[row][col] === PlayerSymbol.O) {
                oCount++;
            }
        }

        if (xCount >= Board.POINT) {
            xPoints++;
        } else if (oCount >= Board.POINT) {
            oPoints++;
        }
    }

    return { xPoints: xPoints, oPoints: oPoints };
}