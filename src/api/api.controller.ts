import {
  Get,
  Controller,
  Param,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { ApiService } from './api.service';
import { MazeResponse, RandomMazeRequestParams } from './types';
import {
  InvalidGenerationAlgorithmNameError,
  MazeParamsError,
} from '../lib/maze-generator/errors';

@Controller('api/v1')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('maze/random/:rows/:columns/:algorithm?')
  generateRandomMaze(
    @Param() mazeParams: RandomMazeRequestParams,
  ): MazeResponse {
    try {
      return this.apiService.generate(mazeParams);
    } catch (err) {
      Logger.error(err.message, err.stack, 'api/v1/maze/random');

      if (
        err instanceof InvalidGenerationAlgorithmNameError ||
        err instanceof MazeParamsError
      ) {
        throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
