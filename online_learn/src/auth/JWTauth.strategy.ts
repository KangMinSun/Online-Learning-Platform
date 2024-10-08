import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || 'defaultSecret',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    return { _id: payload.sub, name: payload.name, studentId: payload.studentId, role: payload.role };
  }
}
