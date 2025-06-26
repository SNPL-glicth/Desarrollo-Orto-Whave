import { Repository } from 'typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { User } from '../users/entities/user.entity';
export declare class HistoriaClinicaService {
    private historiaClinicaRepository;
    private usersRepository;
    constructor(historiaClinicaRepository: Repository<HistoriaClinica>, usersRepository: Repository<User>);
    crearHistoriaClinica(historiaData: Partial<HistoriaClinica>): Promise<HistoriaClinica>;
    obtenerHistoriaPorPaciente(pacienteId: number): Promise<HistoriaClinica[]>;
    obtenerHistoriaPorDoctor(doctorId: number): Promise<HistoriaClinica[]>;
    obtenerHistoriaPorId(id: number): Promise<HistoriaClinica>;
    actualizarHistoriaClinica(id: number, actualizarData: Partial<HistoriaClinica>): Promise<HistoriaClinica>;
    eliminarHistoriaClinica(id: number): Promise<void>;
    obtenerUltimaConsultaPaciente(pacienteId: number, doctorId?: number): Promise<HistoriaClinica | null>;
    verificarAccesoHistoria(historiaId: number, usuarioId: number, rolUsuario: string): Promise<boolean>;
    buscarHistoriasPorDiagnostico(diagnostico: string): Promise<HistoriaClinica[]>;
    obtenerEstadisticasHistorias(): Promise<{
        total: number;
        recientes: number;
        promedioPorMes: number;
    }>;
}
