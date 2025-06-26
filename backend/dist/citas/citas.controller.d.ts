import { CitasService } from './citas.service';
import { CrearCitaDto } from './dto/crear-cita.dto';
import { ActualizarEstadoCitaDto } from './dto/actualizar-estado-cita.dto';
import { BuscarDisponibilidadDto } from './dto/buscar-disponibilidad.dto';
export declare class CitasController {
    private readonly citasService;
    constructor(citasService: CitasService);
    crearCita(crearCitaDto: CrearCitaDto, req: any): Promise<import("./entities/cita.entity").Cita>;
    obtenerCitasPorPaciente(pacienteId: number, req: any): Promise<import("./entities/cita.entity").Cita[]>;
    obtenerCitasPorDoctor(doctorId: number, req: any): Promise<import("./entities/cita.entity").Cita[]>;
    obtenerMisCitas(req: any): Promise<import("./entities/cita.entity").Cita[]>;
    obtenerCitasPendientesAprobacion(req: any): Promise<import("./entities/cita.entity").Cita[]>;
    buscarDisponibilidad(buscarDisponibilidadDto: BuscarDisponibilidadDto): Promise<string[]>;
    obtenerCitaPorId(id: number, req: any): Promise<import("./entities/cita.entity").Cita>;
    actualizarEstadoCita(id: number, actualizarEstadoDto: ActualizarEstadoCitaDto, req: any): Promise<import("./entities/cita.entity").Cita>;
    eliminarCita(id: number, req: any): Promise<{
        message: string;
    }>;
    obtenerAgendaDoctor(doctorId: number, fecha: string, req: any): Promise<{
        fecha: string;
        citas: import("./entities/cita.entity").Cita[];
        horariosDisponibles: string[];
    }>;
}
