import { HistoriaClinicaService } from './historia-clinica.service';
export declare class HistoriaClinicaController {
    private readonly historiaClinicaService;
    constructor(historiaClinicaService: HistoriaClinicaService);
    crearHistoriaClinica(historiaData: any, req: any): Promise<import("./entities/historia-clinica.entity").HistoriaClinica>;
    obtenerHistoriaPorPaciente(pacienteId: number, req: any): Promise<import("./entities/historia-clinica.entity").HistoriaClinica[]>;
    obtenerHistoriaPorDoctor(doctorId: number, req: any): Promise<import("./entities/historia-clinica.entity").HistoriaClinica[]>;
    obtenerMiHistoria(req: any): Promise<import("./entities/historia-clinica.entity").HistoriaClinica[]>;
    obtenerMisConsultas(req: any): Promise<import("./entities/historia-clinica.entity").HistoriaClinica[]>;
    buscarPorDiagnostico(diagnostico: string, req: any): Promise<import("./entities/historia-clinica.entity").HistoriaClinica[]>;
    obtenerEstadisticas(req: any): Promise<{
        total: number;
        recientes: number;
        promedioPorMes: number;
    }>;
    obtenerUltimaConsulta(pacienteId: number, doctorId: string, req: any): Promise<import("./entities/historia-clinica.entity").HistoriaClinica>;
    obtenerHistoriaPorId(id: number, req: any): Promise<import("./entities/historia-clinica.entity").HistoriaClinica>;
    actualizarHistoriaClinica(id: number, actualizarData: any, req: any): Promise<import("./entities/historia-clinica.entity").HistoriaClinica>;
    eliminarHistoriaClinica(id: number, req: any): Promise<{
        message: string;
    }>;
}
