
export enum PlayerSymbol {
    X = 'X',
    O = 'O',
    TIE = 'TIE'
}

export enum Board {
    SIZE = 4,
    POINT = 3
}

export type GameBoardType = (PlayerSymbol | null)[][];

export interface GameState {
    gameTurns: GameTurn[];
    winner: PlayerSymbol | null;
    gameBoard: GameBoardType;
    currentPlayer: PlayerSymbol;
    gamePoints: PointCount;
}

export interface PointCount {
    xPoints: number;
    oPoints: number;
}

export interface GameTurn {
    player: PlayerSymbol;
    square: {
        row: number;
        col: number;
    }
}