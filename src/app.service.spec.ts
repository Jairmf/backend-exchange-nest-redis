import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { RedisConnectorService } from './redis-connector/redis-connector.service';
import { HttpException } from '@nestjs/common';

describe('AppService', () => {
    let appService: AppService;
    let redisConnectorService: RedisConnectorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [AppService, RedisConnectorService],
        }).compile();

        appService = module.get<AppService>(AppService);
        redisConnectorService = module.get<RedisConnectorService>(
        RedisConnectorService,
        );
    });

    it('should return "OK!" for healthCheck', () => {
        const result = appService.healthCheck();
        expect(result).toBe('OK!');
    });

    it('should calculate the conversion value correctly', async () => {
        // Mock the RedisConnectorService's get method to return a specific value
        jest.spyOn(redisConnectorService, 'get').mockResolvedValue(1.5);

        const result = await appService.getConversionValue('USD', 'EUR', 100);
        expect(result.montoConTipoDeCambio).toBe(150);
        expect(result.tipoDeCambio).toBe(1.5);
    });

    it('should set the conversion rate correctly', async () => {
        // Mock the RedisConnectorService's set and get methods
        jest.spyOn(redisConnectorService, 'set').mockResolvedValue();
        jest.spyOn(redisConnectorService, 'get').mockResolvedValue(2.0);

        const result = await appService.setConversionRate('USD', 'EUR', 2.0);
        expect(result.tipoDeCambio).toBe(2.0);
    });

    // Should handle and throw an HttpException when RedisConnectorService.get() throws an error
    it('should handle and throw an HttpException when RedisConnectorService.get() throws an error', async () => {
    // Arrange
    const monedaOrigen = 'USD';
    const monedaDestino = 'EUR';
    const monto = 100;
    jest.spyOn(redisConnectorService, 'get').mockRejectedValue(new Error('Redis error'));

    // Act and Assert
    await expect(appService.getConversionValue(monedaOrigen, monedaDestino, monto)).rejects.toThrow(HttpException);
    });
});
