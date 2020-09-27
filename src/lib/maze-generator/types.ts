export enum GenerationAlgorithms {
  RDFS = 'RDFS',
}

export type GenerationAlgorithmFunction = (
  rows: number,
  columns: number,
) => Maze;

export interface Maze {
  structure: MazeCell[][];
}

export interface MazeCell {
  useLeftWall: boolean;
  useRightWall: boolean;
  useFrontWall: boolean;
  useBackWall: boolean;
}

export interface CellStackData {
  row: number;
  column: number;
}
