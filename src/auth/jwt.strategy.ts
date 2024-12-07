import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService : ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('AUTH_SECRET') || "randomDemoJustToTest"
        })
    }

    // Passport automatically validates the request and then sends the validate (payload) to the validate()
    async validate(payload: any) {
        return { userId: payload.id, username: payload.username };
    }
}
