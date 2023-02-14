import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async authenticateUser(username: string, password: string): Promise<unknown> {
        const user = await this.userService.findByUsername(username);
        if (user && user.passwordHash === password) {
            return this.generateJWTToken(user)
        }
        return null;
    }

    async generateJWTToken(user) {
        const payload = { username: user.username, sub: user.oid }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
