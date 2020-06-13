import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from './user.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './user.entity';
import { JtwPayload } from '../../dist/auth/jwtpayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'TopSecret51'
        });
    }

    async validate(payload: JtwPayload):Promise<User>{
        const { username } = payload;
        
        const user = this.userRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}