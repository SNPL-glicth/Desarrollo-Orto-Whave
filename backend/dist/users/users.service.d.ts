import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { PerfilMedico } from '../perfil-medico/entities/perfil-medico.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { CrearUsuarioAdminDto } from './dto/crear-usuario-admin.dto';
export declare class UsersService {
    private usersRepository;
    private rolesRepository;
    private perfilMedicoRepository;
    private pacientesRepository;
    constructor(usersRepository: Repository<User>, rolesRepository: Repository<Role>, perfilMedicoRepository: Repository<PerfilMedico>, pacientesRepository: Repository<Paciente>);
    crearUsuarioAdmin(crearUsuarioDto: CrearUsuarioAdminDto): Promise<User>;
    obtenerTodosLosUsuarios(): Promise<User[]>;
    obtenerUsuariosPorRol(rolNombre: string): Promise<User[]>;
    obtenerUsuarioPorId(id: number): Promise<User>;
    actualizarUsuario(id: number, actualizarData: Partial<User>): Promise<User>;
    cambiarEstadoUsuario(id: number, activo: boolean): Promise<User>;
    eliminarUsuario(id: number): Promise<void>;
    buscarUsuarios(termino: string): Promise<User[]>;
    obtenerEstadisticasUsuarios(): Promise<{
        total: number;
        verificados: number;
        noVerificados: number;
        distribuciones: {
            admins: number;
            doctores: number;
            pacientes: number;
        };
    }>;
    verificarEmailDisponible(email: string): Promise<boolean>;
}
