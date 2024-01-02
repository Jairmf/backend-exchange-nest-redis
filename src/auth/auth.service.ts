import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor( private jwtService: JwtService ) {}

    async signIn(payload) {
        const { username } = payload;
        if (!username) {
            throw new UnauthorizedException();
        }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
