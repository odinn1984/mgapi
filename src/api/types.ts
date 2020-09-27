import { IsNumberString, IsEnum, IsOptional } from 'class-validator';

import { Maze, GenerationAlgorithms } from '../lib/maze-generator';

export class RandomMazeRequestParams {
  @IsNumberString()
  rows: number;

  @IsNumberString()
  columns: number;

  @IsOptional()
  @IsEnum(GenerationAlgorithms, {
    message: `Algorithm mush be one of: ${Object.values(
      GenerationAlgorithms,
    ).join(', ')}`,
  })
  algorithm?: GenerationAlgorithms;
}

export interface MazeResponse {
  rows: number;
  columns: number;
  algorithm?: GenerationAlgorithms;
  data?: Maze;
}
