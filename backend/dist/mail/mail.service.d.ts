import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendVerificationEmail(email: string, verificationCode: string): Promise<void>;
    sendWelcomeEmail(email: string, name: string): Promise<void>;
}
