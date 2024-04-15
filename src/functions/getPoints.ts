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

export default function getPoints(turns: GameTurn[]): PointCount {
    let gameBoard: GameBoardType = initialGameBoard;

    for (const turn of turns) {
        const { player, square } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    const indices = generateIndices();
    const result = countPoints(gameBoard, indices);

    return { xPoints: result.xPoints, oPoints: result.oPoints };
}

function countPoints(board: GameBoardType, indices: number [][][]): PointCount {
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