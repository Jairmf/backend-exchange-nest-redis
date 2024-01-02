import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisConnectorService } from './redis-connector/redis-connector.service';
@Injectable()
export class AppService {
  constructor(
    private readonly redisConnectorService: RedisConnectorService,
    ) {}

  healthCheck(): string {
    return 'OK!';
  }

  async getConversionValue(monedaOrigen: string, monedaDestino: string, monto: number) {
    const key = `${monedaOrigen}:${monedaDestino}`;
    const result = {
      monto,
      montoConTipoDeCambio: null,
      monedaOrigen,
      monedaDestino,
      tipoDeCambio: null,
    }
    try {
      const tipoDeCambio = await this.redisConnectorService.get(key);
      result.montoConTipoDeCambio = monto * Number(tipoDeCambio);
      result.tipoDeCambio = tipoDeCambio;
    } catch(error) {
        console.log(error)
        throw new HttpException("Error al obtener el tipo de cambio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  async setConversionRate(monedaOrigen: string, monedaDestino: string, tipoDeCambio: number) {
    const key = `${monedaOrigen}:${monedaDestino}`;
    const response = {
      monedaOrigen,
      monedaDestino,
      tipoDeCambio,
    }
    try {
      await this.redisConnectorService.set(key, tipoDeCambio);
      response.tipoDeCambio = await this.redisConnectorService.get(key);
    } catch(error) {
        console.log(error)
        throw new HttpException("Error al guardar el tipo de cambio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return response;
  }
}
