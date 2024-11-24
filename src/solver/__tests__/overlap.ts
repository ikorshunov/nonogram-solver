import { test, expect } from '@jest/globals';

import { overlap } from '../overlap';
import { Line } from '../types';

const createEmptyLine = (length: number): Line => {
    return new Array(length).fill(-1);
};

test('No overlaps', () => {
    const line = createEmptyLine(20);
    [[1, 2, 3], [10]].forEach((clues) => {
        const result = overlap(line, clues);
        expect(result).toStrictEqual(line);
    });
});

describe('Simple overlap', () => {
    test('single overlap', () => {
        // 3||☐☐☒☐☐
        const line = createEmptyLine(5);
        const clue = [3];
        const result = overlap(line, clue);
        expect(result).toStrictEqual([-1, -1, 1, -1, -1]);
    });
    test('overlap <> no overlap <> overlap', () => {
        // 3|1|3||☐☒☒☐☐☐☐☒☒☐
        const line = createEmptyLine(10);
        const clue = [3, 1, 3];
        const result = overlap(line, clue);
        expect(result).toStrictEqual([-1, 1, 1, -1, -1, -1, -1, 1, 1, -1]);
    });
    test('overlap <> overlap <> no overlap', () => {
        // 2|4|1||☐☒☐☐☒☒☒☐☐☐
        const line = createEmptyLine(10);
        const clue = [2, 4, 1];
        const result = overlap(line, clue);
        expect(result).toStrictEqual([-1, 1, -1, -1, 1, 1, 1, -1, -1, -1]);
    });
    test('no overlap <> overlap <> no overlap', () => {
        // 1|4|1||☐☐☐☐☒☒☐☐☐☐
        const line = createEmptyLine(10);
        const clue = [1, 4, 1];
        const result = overlap(line, clue);
        expect(result).toStrictEqual([-1, -1, -1, -1, 1, 1, -1, -1, -1, -1]);
    });
    test('no overlap <> overlap <> overlap', () => {
        // 1|2|4||☐☐☐☒☐☐☒☒☒☐
        const line = createEmptyLine(10);
        const clue = [1, 2, 4];
        const result = overlap(line, clue);
        expect(result).toStrictEqual([-1, -1, -1, 1, -1, -1, 1, 1, 1, -1]);
    });
});
