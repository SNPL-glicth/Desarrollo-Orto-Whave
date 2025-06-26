import { Role } from '../../roles/entities/role.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    rolId: number;
    rol: Role;
    fechaCreacion: Date;
    isVerified: boolean;
    verificationCode: string;
}
