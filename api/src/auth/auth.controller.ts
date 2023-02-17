import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {Public} from "./auth-decorators";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    @Public()
    @Post('login')
    async login(@Body() credentials) {
        return this.authService.authenticateUser(credentials.username, credentials.password)
    }
}
