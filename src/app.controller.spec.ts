import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisConnectorService } from './redis-connector/redis-connector.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AppController', () => {
  let appController: AppController;
  let redisConnectorService: RedisConnectorService;
  let authGuard: AuthGuard;
  let appService: AppService;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, RedisConnectorService, AuthGuard, AuthService, JwtService],
    }).compile();

    appController = app.get<AppController>(AppController);
    redisConnectorService = app.get<RedisConnectorService>(RedisConnectorService);
    authGuard = app.get<AuthGuard>(AuthGuard);
    appService = app.get<AppService>(AppService);
    authService = app.get<AuthService>(AuthService);
    jwtService = app.get<JwtService>(JwtService);
  });

  describe('root', () => {
    it('should return "OK!"', () => {
      expect(appController.healthCheck()).toBe('OK!');
    });
  });
});
