export declare class CrearUsuarioAdminDto {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    rolId: number;
    telefono?: string;
    direccion?: string;
    perfilMedico?: {
        numeroRegistroMedico: string;
        especialidad: string;
        universidadEgreso: string;
        añoGraduacion: number;
        biografia?: string;
        tarifaConsulta?: number;
    };
    perfilPaciente?: {
        numeroIdentificacion: string;
        tipoIdentificacion: string;
        fechaNacimiento: string;
        genero: string;
        eps?: string;
    };
}
