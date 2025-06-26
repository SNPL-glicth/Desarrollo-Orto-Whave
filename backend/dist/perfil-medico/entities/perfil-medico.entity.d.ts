import { User } from '../../users/entities/user.entity';
export declare class PerfilMedico {
    id: number;
    usuarioId: number;
    usuario: User;
    numeroRegistroMedico: string;
    especialidad: string;
    subespecialidades: string[];
    universidadEgreso: string;
    añoGraduacion: number;
    biografia: string;
    aceptaNuevosPacientes: boolean;
    tarifaConsulta: number;
    duracionConsultaDefault: number;
    telefonoConsultorio: string;
    direccionConsultorio: string;
    ciudad: string;
    diasAtencion: string[];
    horaInicio: string;
    horaFin: string;
    horaAlmuerzoInicio: string;
    horaAlmuerzoFin: string;
    activo: boolean;
    verificadoColegio: boolean;
    fechaVerificacion: Date;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
