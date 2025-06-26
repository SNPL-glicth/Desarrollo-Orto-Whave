import { User } from '../../users/entities/user.entity';
export declare class Role {
    id: number;
    nombre: string;
    activo: boolean;
    fechaCreacion: Date;
    usuarios: User[];
}
