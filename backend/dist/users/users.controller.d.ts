import { UsersService } from './users.service';
import { CrearUsuarioAdminDto } from './dto/crear-usuario-admin.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    private usersRepository;
    constructor(usersService: UsersService, usersRepository: Repository<User>);
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        telefono: string;
        direccion: string;
        rolId: number;
        rol: import("../roles/entities/role.entity").Role;
        fechaCreacion: Date;
        isVerified: boolean;
        verificationCode: string;
    }>;
    updateProfile(req: any, updateData: Partial<User>): Promise<{
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        telefono: string;
        direccion: string;
        rolId: number;
        rol: import("../roles/entities/role.entity").Role;
        fechaCreacion: Date;
        isVerified: boolean;
        verificationCode: string;
    }>;
    crearUsuarioAdmin(crearUsuarioDto: CrearUsuarioAdminDto, req: any): Promise<User>;
    crearUsuarioPublico(crearUsuarioDto: CrearUsuarioAdminDto): Promise<User>;
    obtenerRoles(): Promise<import("../roles/entities/role.entity").Role[]>;
    obtenerTodosLosUsuarios(req: any): Promise<User[]>;
    obtenerUsuariosPorRol(rol: string, req: any): Promise<User[]>;
    buscarUsuarios(termino: string, req: any): Promise<User[]>;
    obtenerEstadisticasUsuarios(req: any): Promise<{
        total: number;
        verificados: number;
        noVerificados: number;
        distribuciones: {
            admins: number;
            doctores: number;
            pacientes: number;
        };
    }>;
    obtenerUsuarioPorId(id: number, req: any): Promise<User>;
    actualizarUsuario(id: number, actualizarData: Partial<User>, req: any): Promise<User>;
    cambiarEstadoUsuario(id: number, activo: boolean, req: any): Promise<User>;
    eliminarUsuario(id: number, req: any): Promise<{
        message: string;
    }>;
    verificarEmailDisponible(email: string): Promise<{
        disponible: boolean;
    }>;
}
