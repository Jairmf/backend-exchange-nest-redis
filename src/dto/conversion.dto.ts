import { IsIn, IsNumber, IsPositive } from "class-validator";

enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    PEN = 'PEN'
}
export class GetConversionDto {
    @IsIn([Currency.USD, Currency.EUR, Currency.GBP, Currency.PEN])
    monedaOrigen: Currency;

    @IsIn([Currency.USD, Currency.EUR, Currency.GBP, Currency.PEN])
    monedaDestino: Currency;

    @IsNumber()
    @IsPositive()
    monto: number;
}

export class SetConversionDto {
    @IsIn([Currency.USD, Currency.EUR, Currency.GBP, Currency.PEN])
    monedaOrigen: Currency;

    @IsIn([Currency.USD, Currency.EUR, Currency.GBP, Currency.PEN])
    monedaDestino: Currency;

    @IsNumber()
    @IsPositive()
    tipoDeCambio: number;
}