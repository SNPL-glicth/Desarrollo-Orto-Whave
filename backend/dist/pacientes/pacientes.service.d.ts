import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { User } from '../users/entities/user.entity';
export declare class PacientesService {
    private pacientesRepository;
    private usersRepository;
    constructor(pacientesRepository: Repository<Paciente>, usersRepository: Repository<User>);
    crearPaciente(pacienteData: Partial<Paciente>): Promise<Paciente>;
    obtenerPorUsuarioId(usuarioId: number): Promise<Paciente>;
    actualizarPaciente(usuarioId: number, actualizarData: Partial<Paciente>): Promise<Paciente>;
    obtenerTodosLosPacientes(): Promise<Paciente[]>;
    buscarPacientePorIdentificacion(numeroIdentificacion: string): Promise<Paciente | null>;
    obtenerPacientesPorDoctor(doctorId: number): Promise<User[]>;
    verificarPacienteExiste(usuarioId: number): Promise<boolean>;
    marcarPrimeraConsultaCompleta(usuarioId: number): Promise<void>;
    obtenerEstadisticasPacientes(): Promise<{
        total: number;
        nuevos: number;
        regulares: number;
    }>;
}
