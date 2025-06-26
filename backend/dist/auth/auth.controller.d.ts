import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            nombre: any;
            apellido: any;
            rol: any;
        };
        redirect: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        email: any;
    }>;
    verify(verifyDto: VerifyDto): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
}
