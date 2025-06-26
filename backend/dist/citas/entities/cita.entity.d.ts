import { User } from '../../users/entities/user.entity';
export declare class Cita {
    id: number;
    pacienteId: number;
    paciente: User;
    doctorId: number;
    doctor: User;
    fechaHora: Date;
    duracion: number;
    estado: string;
    tipoConsulta: string;
    motivoConsulta: string;
    notasDoctor: string;
    notasPaciente: string;
    costo: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    aprobadaPor: number;
    aprobadaPorUsuario: User;
    fechaAprobacion: Date;
    razonRechazo: string;
}
