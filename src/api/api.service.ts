import { Injectable } from '@nestjs/common';

import { MazeResponse, RandomMazeRequestParams } from './types';
import {
  GetGeneratorInstance,
  MazeGenerator,
  GenerationAlgorithms,
} from '../lib/maze-generator';

@Injectable()
export class ApiService {
  generate(mazeParams: RandomMazeRequestParams): MazeResponse {
    const generator: MazeGenerator = GetGeneratorInstance(
      mazeParams.algorithm || GenerationAlgorithms.RDFS,
      mazeParams.rows,
      mazeParams.columns,
    );

    generator.generate();

    return {
      rows: mazeParams.rows,
      columns: mazeParams.columns,
      algorithm: mazeParams.algorithm || GenerationAlgorithms.RDFS,
      data: generator.maze,
    };
  }
}
