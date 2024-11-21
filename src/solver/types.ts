export type Clue = number;
export type Clues = Clue[];
export type Puzzle = {
    rows: Clues[];
    cols: Clues[];
};

export type Cell = -1 | 0 | 1;
export type Line = Cell[];
export type Grid = {
    rows: Line[];
    cols: Line[];
};
