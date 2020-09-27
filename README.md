# Maze Generator API Server

## Description

A simple REST API that generates random mazes.

## Usage

```bash
$ curl 'http://localhost:3000/api/v1/maze/random/<rows>/<columns>/[algorithm]'
```

Where the parameters are:

`rows` - The number or rows in the generated maze
`columns` - The number or columns in the generated maze
`algorithm` - [Optional] The algorithm that is used to generate the maze. Currently only supports `RDFS` (Default: `RDFS`)

The response for this endpoint is:

```json
{
    "rows": "2",
    "columns": "2",
    "algorithm": "RDFS",
    "data": {
        "structure": [
            [
                {
                    "useLeftWall": true,
                    "useRightWall": false,
                    "useFrontWall": true,
                    "useBackWall": true
                },
                {
                    "useLeftWall": false,
                    "useRightWall": true,
                    "useFrontWall": false,
                    "useBackWall": true
                }
            ],
            [
                {
                    "useLeftWall": true,
                    "useRightWall": false,
                    "useFrontWall": true,
                    "useBackWall": true
                },
                {
                    "useLeftWall": false,
                    "useRightWall": true,
                    "useFrontWall": true,
                    "useBackWall": false
                }
            ]
        ]
    }
}
```

Where `data.structure` is a 2 dimentional array of the size `rows`x`columns` where each cell describes which walls to use to build the maze.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```