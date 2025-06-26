import { PerfilMedicoService } from './perfil-medico.service';
export declare class PerfilMedicoController {
    private readonly perfilMedicoService;
    constructor(perfilMedicoService: PerfilMedicoService);
    obtenerTodosLosDoctores(req: any): Promise<import("./entities/perfil-medico.entity").PerfilMedico[]>;
    obtenerDoctoresDisponibles(): Promise<import("./entities/perfil-medico.entity").PerfilMedico[]>;
    obtenerMiPerfil(req: any): Promise<import("./entities/perfil-medico.entity").PerfilMedico>;
    obtenerPerfilPorUsuario(usuarioId: number, req: any): Promise<import("./entities/perfil-medico.entity").PerfilMedico>;
    crearPerfil(perfilData: any, req: any): Promise<import("./entities/perfil-medico.entity").PerfilMedico>;
    actualizarMiPerfil(actualizarData: any, req: any): Promise<import("./entities/perfil-medico.entity").PerfilMedico>;
    actualizarPerfil(usuarioId: number, actualizarData: any, req: any): Promise<import("./entities/perfil-medico.entity").PerfilMedico>;
}
