import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { PerfilMedico } from '../perfil-medico/entities/perfil-medico.entity';
import { User } from '../users/entities/user.entity';
import { CrearCitaDto } from './dto/crear-cita.dto';
import { ActualizarEstadoCitaDto } from './dto/actualizar-estado-cita.dto';
import { BuscarDisponibilidadDto } from './dto/buscar-disponibilidad.dto';
export declare class CitasService {
    private citasRepository;
    private perfilMedicoRepository;
    private usersRepository;
    constructor(citasRepository: Repository<Cita>, perfilMedicoRepository: Repository<PerfilMedico>, usersRepository: Repository<User>);
    crearCita(crearCitaDto: CrearCitaDto): Promise<Cita>;
    obtenerCitasPorPaciente(pacienteId: number): Promise<Cita[]>;
    obtenerCitasPorDoctor(doctorId: number): Promise<Cita[]>;
    obtenerCitasPendientesAprobacion(): Promise<Cita[]>;
    actualizarEstadoCita(id: number, actualizarEstadoDto: ActualizarEstadoCitaDto): Promise<Cita>;
    buscarDisponibilidad(buscarDisponibilidadDto: BuscarDisponibilidadDto): Promise<string[]>;
    private verificarHorarioAtencion;
    private generarHorariosDisponibles;
    private parseHora;
    private formatearHora;
    private estaEnHorarioAlmuerzo;
    obtenerCitaPorId(id: number): Promise<Cita>;
    eliminarCita(id: number): Promise<void>;
}
