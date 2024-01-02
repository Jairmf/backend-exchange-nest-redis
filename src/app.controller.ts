import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GetConversionDto, SetConversionDto } from './dto/conversion.dto';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { SignInDto } from './dto/signin.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
    ) {}

  @Get('health-check')
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('currency')
  getConversionValue(@Body() conversionData: GetConversionDto) {
    const { monedaOrigen, monedaDestino, monto } = conversionData;
    return this.appService.getConversionValue(monedaOrigen, monedaDestino, monto);
  }
  
  @UseGuards(AuthGuard)
  @Post('currency')
  setConversionRate(@Body() conversionData: SetConversionDto) {
    const { monedaOrigen, monedaDestino, tipoDeCambio} = conversionData;
    return this.appService.setConversionRate(monedaOrigen, monedaDestino, tipoDeCambio);
  }

}
