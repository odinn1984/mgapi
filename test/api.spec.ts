import * as request from 'supertest';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

describe('API Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/api/v1/maze/random', () => {
    const uriPathPrefix = '/api/v1/maze/random';

    it('should return 200 on valid input without algorithm', () => {
      return request(app.getHttpServer())
        .get(`${uriPathPrefix}/2/2`)
        .expect(200);
    });

    it('should return 200 on valid input with algorithm', () => {
      return request(app.getHttpServer())
        .get(`${uriPathPrefix}/2/2/RDFS`)
        .expect(200);
    });

    it('should return a RDFS maze by default', async () => {
      const response = await request(app.getHttpServer()).get(
        `${uriPathPrefix}/1/1`,
      );

      expect(response.body.rows).toBe('1');
      expect(response.body.columns).toBe('1');
      expect(response.body.algorithm).toBe('RDFS');
      expect(response.body.data.structure.length).toBe(1);
      expect(response.body.data.structure[0].length).toBe(1);
    });

    it('should return a 2 by 2 maze', async () => {
      const response = await request(app.getHttpServer()).get(
        `${uriPathPrefix}/2/2/RDFS`,
      );

      expect(response.body.rows).toBe('2');
      expect(response.body.columns).toBe('2');
      expect(response.body.algorithm).toBe('RDFS');
      expect(response.body.data.structure.length).toBe(2);
      expect(response.body.data.structure[0].length).toBe(2);
      expect(response.body.data.structure[1].length).toBe(2);
    });

    it('should return a 4 by 3 maze', async () => {
      const response = await request(app.getHttpServer()).get(
        `${uriPathPrefix}/4/3/RDFS`,
      );

      expect(response.body.rows).toBe('4');
      expect(response.body.columns).toBe('3');
      expect(response.body.algorithm).toBe('RDFS');
      expect(response.body.data.structure.length).toBe(4);
      expect(response.body.data.structure[0].length).toBe(3);
      expect(response.body.data.structure[1].length).toBe(3);
      expect(response.body.data.structure[2].length).toBe(3);
      expect(response.body.data.structure[3].length).toBe(3);
    });

    it('should return 400 on non number row input', () => {
      return request(app.getHttpServer())
        .get(`${uriPathPrefix}/a/2/RDFS`)
        .expect(400);
    });

    it('should return 422 on non row not in range 1 ... 100', async () => {
      await request(app.getHttpServer())
        .get(`${uriPathPrefix}/101/2/RDFS`)
        .expect(422);

      await request(app.getHttpServer())
        .get(`${uriPathPrefix}/0/2/RDFS`)
        .expect(422);
    });

    it('should return 400 on non number column input', () => {
      return request(app.getHttpServer())
        .get(`${uriPathPrefix}/2/a/RDFS`)
        .expect(400);
    });

    it('should return 422 on non column not in range 1 ... 100', async () => {
      await request(app.getHttpServer())
        .get(`${uriPathPrefix}/2/101/RDFS`)
        .expect(422);

      await request(app.getHttpServer())
        .get(`${uriPathPrefix}/2/0/RDFS`)
        .expect(422);
    });

    it('should return 400 on non existing algorithm input', () => {
      return request(app.getHttpServer())
        .get(`${uriPathPrefix}/2/2/LALALA`)
        .expect(400);
    });
  });
});
