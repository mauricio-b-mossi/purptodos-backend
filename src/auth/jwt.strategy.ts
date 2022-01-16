import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { secret } from "jwtConstants";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
            // ignoreExpiration: true
        })
    }

    // Passport automatically validates the request and then sends the validate (payload) to the validate()
    async validate(payload: any) {
        return { userId: payload.id, username: payload.username };
    }
}