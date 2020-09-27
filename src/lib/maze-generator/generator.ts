import * as generationAlgorithmImplementations from './generation-algorithms';

import { MazeParamsError, InvalidGenerationAlgorithmNameError } from './errors';
import {
  Maze,
  GenerationAlgorithmFunction,
  GenerationAlgorithms,
} from './types';

export class MazeGenerator {
  private mazeRows: number;
  private mazeColumns: number;
  private mazeData: Maze;
  private generatorImplementation: GenerationAlgorithmFunction;

  public constructor(
    generationAlgorithm: GenerationAlgorithmFunction,
    rows = 10,
    columns = 10,
  ) {
    this.rows = rows;
    this.columns = columns;
    this.generatorImplementation = generationAlgorithm;
  }

  public get rows(): number {
    return this.mazeRows;
  }

  public get columns(): number {
    return this.mazeColumns;
  }

  public get maze(): Maze {
    return this.mazeData;
  }

  public set rows(rows: number) {
    if (rows < 1 || rows > 100) {
      throw new MazeParamsError('Row amount must be between 1 and 100');
    }

    this.mazeRows = rows;
  }

  public set columns(columns: number) {
    if (columns < 1 || columns > 100) {
      throw new MazeParamsError('Column amount must be between 1 and 100');
    }

    this.mazeColumns = columns;
  }

  public generate(): void {
    this.mazeData = this.generatorImplementation(this.rows, this.columns);
  }
}

export function GetGeneratorInstance(
  algorithm: GenerationAlgorithms,
  rows: number = 10,
  columns: number = 10,
): MazeGenerator {
  const normalizedAlgorithmName = algorithm.toLowerCase();

  if (!generationAlgorithmImplementations[normalizedAlgorithmName]) {
    throw new InvalidGenerationAlgorithmNameError(
      `Requested algorithm ${algorithm} is not implemented`,
    );
  }

  return new MazeGenerator(
    generationAlgorithmImplementations[normalizedAlgorithmName],
    rows,
    columns,
  );
}
