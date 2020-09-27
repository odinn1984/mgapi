export class MazeParamsError extends Error {
  constructor(message) {
    super(message || 'Invalid parameters supplied for maze');

    this.name = 'MazeParamsError';
  }
}

export class InvalidGenerationAlgorithmNameError extends Error {
  constructor(message) {
    super(message || 'Requested algorithm name does not exist');

    this.name = 'InvalidGenerationAlgorithmNameError';
  }
}
