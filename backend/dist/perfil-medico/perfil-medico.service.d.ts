import { Repository } from 'typeorm';
import { PerfilMedico } from './entities/perfil-medico.entity';
import { User } from '../users/entities/user.entity';
export declare class PerfilMedicoService {
    private perfilMedicoRepository;
    private usersRepository;
    constructor(perfilMedicoRepository: Repository<PerfilMedico>, usersRepository: Repository<User>);
    crearPerfilMedico(perfilData: Partial<PerfilMedico>): Promise<PerfilMedico>;
    obtenerPorUsuarioId(usuarioId: number): Promise<PerfilMedico>;
    actualizarPerfil(usuarioId: number, actualizarData: Partial<PerfilMedico>): Promise<PerfilMedico>;
    obtenerTodosLosDoctores(): Promise<PerfilMedico[]>;
    obtenerDoctoresDisponibles(): Promise<PerfilMedico[]>;
}
