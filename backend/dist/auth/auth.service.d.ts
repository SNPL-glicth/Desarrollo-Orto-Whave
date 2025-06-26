import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    private mailerService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, mailerService: MailerService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
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
    register(userData: any): Promise<{
        message: string;
        email: any;
    }>;
    verifyCode(email: string, code: string): Promise<{
        message: string;
    }>;
    private getRedirectPath;
}
