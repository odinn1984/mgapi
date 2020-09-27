import * as rnd from 'random';

import { Maze, MazeCell, CellStackData } from './types';

export function getEmptyMaze(rows: number, columns: number): Maze {
  const structure = new Array<MazeCell[]>(Number(rows));

  for (let i = 0; i < rows; i++) {
    structure[i] = new Array<MazeCell>(Number(columns));

    for (let j = 0; j < columns; j++) {
      structure[i][j] = {
        useLeftWall: true,
        useRightWall: true,
        useFrontWall: true,
        useBackWall: true,
      };
    }
  }

  return { structure };
}

export function hasUnvisitedNeightbours(
  mazeCells: boolean[][],
  currentCell: CellStackData,
): boolean {
  return (
    (currentCell.column - 1 >= 0 &&
      !wasLeftCellVisited(mazeCells, currentCell)) ||
    (currentCell.column + 1 < mazeCells[currentCell.row].length &&
      !wasRightCellVisited(mazeCells, currentCell)) ||
    (currentCell.row + 1 < mazeCells.length &&
      !wasFrontCellVisited(mazeCells, currentCell)) ||
    (currentCell.row - 1 >= 0 && !wasBackCellVisited(mazeCells, currentCell))
  );
}

export function getRandomUnvisitedNeightbour(
  mazeCells: boolean[][],
  currentCell: CellStackData,
): CellStackData {
  const unvisitedNeightbours: CellStackData[] = [];

  if (
    currentCell.column - 1 >= 0 &&
    !wasLeftCellVisited(mazeCells, currentCell)
  ) {
    unvisitedNeightbours.push({
      row: currentCell.row,
      column: currentCell.column - 1,
    });
  }

  if (
    currentCell.column + 1 < mazeCells[currentCell.row].length &&
    !wasRightCellVisited(mazeCells, currentCell)
  ) {
    unvisitedNeightbours.push({
      row: currentCell.row,
      column: currentCell.column + 1,
    });
  }

  if (
    currentCell.row + 1 < mazeCells.length &&
    !wasFrontCellVisited(mazeCells, currentCell)
  ) {
    unvisitedNeightbours.push({
      row: currentCell.row + 1,
      column: currentCell.column,
    });
  }

  if (currentCell.row - 1 >= 0 && !wasBackCellVisited(mazeCells, currentCell)) {
    unvisitedNeightbours.push({
      row: currentCell.row - 1,
      column: currentCell.column,
    });
  }

  return unvisitedNeightbours.length > 0
    ? unvisitedNeightbours[rnd.int(0, unvisitedNeightbours.length - 1)]
    : null;
}

export function wasLeftCellVisited(
  mazeCells: boolean[][],
  currentCell: CellStackData,
): boolean {
  return !!mazeCells[currentCell.row][currentCell.column - 1];
}

export function wasRightCellVisited(
  mazeCells: boolean[][],
  currentCell: CellStackData,
): boolean {
  return !!mazeCells[currentCell.row][currentCell.column + 1];
}

function wasFrontCellVisited(
  mazeCells: boolean[][],
  currentCell: CellStackData,
): boolean {
  return !!mazeCells[currentCell.row + 1][currentCell.column];
}

export function wasBackCellVisited(
  mazeCells: boolean[][],
  currentCell: CellStackData,
): boolean {
  return !!mazeCells[currentCell.row - 1][currentCell.column];
}

export function removeWallBetweenCells(
  generatedMaze: Maze,
  firstCell: CellStackData,
  secondCell: CellStackData,
): void {
  if (firstCell.row - secondCell.row === 0) {
    if (firstCell.column - secondCell.column > 0) {
      generatedMaze.structure[firstCell.row][
        firstCell.column
      ].useLeftWall = false;
      generatedMaze.structure[secondCell.row][
        secondCell.column
      ].useRightWall = false;
    } else if (firstCell.column - secondCell.column < 0) {
      generatedMaze.structure[firstCell.row][
        firstCell.column
      ].useRightWall = false;
      generatedMaze.structure[secondCell.row][
        secondCell.column
      ].useLeftWall = false;
    }
  } else if (firstCell.column - secondCell.column === 0) {
    if (firstCell.row - secondCell.row > 0) {
      generatedMaze.structure[firstCell.row][
        firstCell.column
      ].useBackWall = false;
      generatedMaze.structure[secondCell.row][
        secondCell.column
      ].useFrontWall = false;
    } else if (firstCell.row - secondCell.row < 0) {
      generatedMaze.structure[firstCell.row][
        firstCell.column
      ].useFrontWall = false;
      generatedMaze.structure[secondCell.row][
        secondCell.column
      ].useBackWall = false;
    }
  }
}
