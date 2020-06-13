/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JtwPayload } from './jwtpayload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jtwService: JwtService
    ){}    

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return await this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken:string }>{
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        
        if (!username) {
            throw new UnauthorizedException('Invalid credentials'); 
        } 

        const payload: JtwPayload = { username };

        const accessToken = await this.jtwService.sign(payload);

        return { accessToken };
    }
}
