import { User } from '../../users/entities/user.entity';
import { Cita } from '../../citas/entities/cita.entity';
export declare class HistoriaClinica {
    id: number;
    pacienteId: number;
    paciente: User;
    doctorId: number;
    doctor: User;
    citaId: number;
    cita: Cita;
    motivoConsulta: string;
    enfermedadActual: string;
    antecedentesMedicos: string;
    antecedentesQuirurgicos: string;
    alergias: string;
    medicamentosActuales: string;
    examenFisico: string;
    signosVitales: string;
    diagnostico: string;
    diagnosticoDiferencial: string;
    tratamiento: string;
    examenesSolicitados: string;
    interconsultas: string;
    recomendaciones: string;
    observaciones: string;
    proximaConsulta: Date;
    fechaConsulta: Date;
    fechaActualizacion: Date;
}
