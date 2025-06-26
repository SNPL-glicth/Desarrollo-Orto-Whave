import { PacientesService } from './pacientes.service';
export declare class PacientesController {
    private readonly pacientesService;
    constructor(pacientesService: PacientesService);
    obtenerTodosLosPacientes(req: any): Promise<import("./entities/paciente.entity").Paciente[]>;
    obtenerMisPacientes(req: any): Promise<import("../users/entities/user.entity").User[]>;
    obtenerMiPerfil(req: any): Promise<import("./entities/paciente.entity").Paciente | {
        usuarioId: any;
        usuario: {
            id: any;
            nombre: any;
            apellido: any;
            email: any;
            telefono: any;
        };
    }>;
    buscarPaciente(identificacion: string, req: any): Promise<import("./entities/paciente.entity").Paciente>;
    obtenerEstadisticas(req: any): Promise<{
        total: number;
        nuevos: number;
        regulares: number;
    }>;
    obtenerPacientePorUsuario(usuarioId: number, req: any): Promise<import("./entities/paciente.entity").Paciente>;
    crearPaciente(pacienteData: any, req: any): Promise<import("./entities/paciente.entity").Paciente>;
    actualizarMiPerfil(actualizarData: any, req: any): Promise<import("./entities/paciente.entity").Paciente>;
    actualizarPaciente(usuarioId: number, actualizarData: any, req: any): Promise<import("./entities/paciente.entity").Paciente>;
    marcarPrimeraConsultaCompleta(usuarioId: number, req: any): Promise<{
        message: string;
    }>;
}
