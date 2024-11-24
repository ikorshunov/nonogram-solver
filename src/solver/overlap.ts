import { Clues, Line } from './types';

export const overlap = (line: Line, clues: Clues): Line => {
    const totalBlocksSize = clues.reduce((acc, clue) => acc + clue, 0);
    const totalGapsSize = clues.length - 1;
    const completeLineSize = totalBlocksSize + totalGapsSize;
    const result = line.slice();

    if (line.length / completeLineSize >= 2) {
        return result;
    }

    const minBlockSize = line.length - completeLineSize + 1;
    const gap = minBlockSize;
    const halfGap = Math.ceil(gap / 2);

    let pointer = 0;
    for (let i = 0; i < clues.length; i++) {
        const currentClue = clues[i];
        const prevClue = i > 0 ? clues[i - 1] : null;
        const currentClueOverlaps = currentClue >= minBlockSize;
        const prevClueOverlaps = prevClue ? prevClue >= minBlockSize : false;
        const blockSize = currentClue - minBlockSize + 1;

        if (currentClueOverlaps) {
            pointer += prevClueOverlaps ? gap : halfGap;
            for (let j = pointer; j < pointer + blockSize; j++) {
                result[j] = 1;
            }
            pointer += blockSize;
        } else {
            pointer += currentClue + 1;
            if (prevClueOverlaps) {
                pointer += halfGap;
            }
        }
    }

    return result;
};
