import * as rnd from 'random';

import { GenerationAlgorithmFunction, Maze, CellStackData } from '../types';
import {
  getEmptyMaze,
  hasUnvisitedNeightbours,
  getRandomUnvisitedNeightbour,
  removeWallBetweenCells,
} from '../helpers';

export const rdfs: GenerationAlgorithmFunction = (
  rows: number,
  columns: number,
): Maze => {
  const generatedMaze: Maze = getEmptyMaze(rows, columns);
  const mazeCellsVisitedStatus: boolean[][] = new Array<boolean>(Number(rows))
    .fill(false)
    .map(() => new Array<boolean>(Number(columns)).fill(false));
  const cellStack: Array<CellStackData> = [
    { row: rnd.int(0, rows - 1), column: rnd.int(0, columns - 1) },
  ];

  mazeCellsVisitedStatus[cellStack[0].row][cellStack[0].column] = true;

  while (cellStack.length > 0) {
    const currentCell: CellStackData = cellStack.pop();

    if (hasUnvisitedNeightbours(mazeCellsVisitedStatus, currentCell)) {
      cellStack.push(currentCell);

      const unvisitedNeightbourCell: CellStackData = getRandomUnvisitedNeightbour(
        mazeCellsVisitedStatus,
        currentCell,
      );

      removeWallBetweenCells(
        generatedMaze,
        currentCell,
        unvisitedNeightbourCell,
      );

      mazeCellsVisitedStatus[unvisitedNeightbourCell.row][
        unvisitedNeightbourCell.column
      ] = true;
      cellStack.push(unvisitedNeightbourCell);
    }
  }

  return generatedMaze;
};
