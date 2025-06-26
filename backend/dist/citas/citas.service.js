"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cita_entity_1 = require("./entities/cita.entity");
const perfil_medico_entity_1 = require("../perfil-medico/entities/perfil-medico.entity");
const user_entity_1 = require("../users/entities/user.entity");
let CitasService = class CitasService {
    constructor(citasRepository, perfilMedicoRepository, usersRepository) {
        this.citasRepository = citasRepository;
        this.perfilMedicoRepository = perfilMedicoRepository;
        this.usersRepository = usersRepository;
    }
    async crearCita(crearCitaDto) {
        const doctor = await this.usersRepository.findOne({
            where: { id: crearCitaDto.doctorId },
            relations: ['rol']
        });
        if (!doctor || doctor.rol.nombre !== 'doctor') {
            throw new common_1.NotFoundException('Doctor no encontrado');
        }
        const paciente = await this.usersRepository.findOne({
            where: { id: crearCitaDto.pacienteId },
            relations: ['rol']
        });
        if (!paciente || paciente.rol.nombre !== 'paciente') {
            throw new common_1.NotFoundException('Paciente no encontrado');
        }
        const fechaHora = new Date(crearCitaDto.fechaHora);
        const fechaFin = new Date(fechaHora.getTime() + (crearCitaDto.duracion || 60) * 60000);
        const citaConflicto = await this.citasRepository.findOne({
            where: {
                doctorId: crearCitaDto.doctorId,
                fechaHora: (0, typeorm_2.Between)(new Date(fechaHora.getTime() - 59 * 60000), new Date(fechaFin.getTime() + 59 * 60000)),
                estado: 'cancelada'
            }
        });
        if (citaConflicto && citaConflicto.estado !== 'cancelada') {
            throw new common_1.ConflictException('El horario solicitado no está disponible');
        }
        const perfilMedico = await this.perfilMedicoRepository.findOne({
            where: { usuarioId: crearCitaDto.doctorId }
        });
        if (perfilMedico && !this.verificarHorarioAtencion(fechaHora, perfilMedico)) {
            throw new common_1.BadRequestException('El horario solicitado está fuera del horario de atención del doctor');
        }
        const nuevaCita = this.citasRepository.create({
            ...crearCitaDto,
            fechaHora,
            estado: 'pendiente'
        });
        return await this.citasRepository.save(nuevaCita);
    }
    async obtenerCitasPorPaciente(pacienteId) {
        return await this.citasRepository.find({
            where: { pacienteId },
            relations: ['doctor', 'doctor.rol'],
            order: { fechaHora: 'DESC' }
        });
    }
    async obtenerCitasPorDoctor(doctorId) {
        return await this.citasRepository.find({
            where: { doctorId },
            relations: ['paciente', 'paciente.rol'],
            order: { fechaHora: 'ASC' }
        });
    }
    async obtenerCitasPendientesAprobacion() {
        return await this.citasRepository.find({
            where: { estado: 'pendiente' },
            relations: ['paciente', 'doctor', 'paciente.rol', 'doctor.rol'],
            order: { fechaCreacion: 'ASC' }
        });
    }
    async actualizarEstadoCita(id, actualizarEstadoDto) {
        const cita = await this.citasRepository.findOne({
            where: { id },
            relations: ['paciente', 'doctor']
        });
        if (!cita) {
            throw new common_1.NotFoundException('Cita no encontrada');
        }
        if (actualizarEstadoDto.estado === 'aprobada') {
            cita.fechaAprobacion = new Date();
            if (actualizarEstadoDto.aprobadaPor) {
                cita.aprobadaPor = actualizarEstadoDto.aprobadaPor;
            }
        }
        Object.assign(cita, actualizarEstadoDto);
        return await this.citasRepository.save(cita);
    }
    async buscarDisponibilidad(buscarDisponibilidadDto) {
        const { doctorId, fecha, duracion = 60 } = buscarDisponibilidadDto;
        const perfilMedico = await this.perfilMedicoRepository.findOne({
            where: { usuarioId: doctorId }
        });
        if (!perfilMedico) {
            throw new common_1.NotFoundException('Perfil médico no encontrado');
        }
        const fechaInicio = new Date(fecha + 'T00:00:00');
        const fechaFin = new Date(fecha + 'T23:59:59');
        const citasExistentes = await this.citasRepository.find({
            where: {
                doctorId,
                fechaHora: (0, typeorm_2.Between)(fechaInicio, fechaFin),
                estado: 'cancelada'
            },
            order: { fechaHora: 'ASC' }
        });
        const citasOcupadas = citasExistentes.filter(cita => cita.estado !== 'cancelada');
        return this.generarHorariosDisponibles(perfilMedico, citasOcupadas, fecha, duracion);
    }
    verificarHorarioAtencion(fechaHora, perfilMedico) {
        const diaSemana = fechaHora.toLocaleDateString('es-ES', { weekday: 'long' });
        if (!perfilMedico.diasAtencion || perfilMedico.diasAtencion.length === 0) {
            return true;
        }
        if (!perfilMedico.diasAtencion.includes(diaSemana)) {
            return false;
        }
        const horaConsulta = fechaHora.toTimeString().substring(0, 5);
        if (perfilMedico.horaInicio && horaConsulta < perfilMedico.horaInicio) {
            return false;
        }
        if (perfilMedico.horaFin && horaConsulta > perfilMedico.horaFin) {
            return false;
        }
        if (perfilMedico.horaAlmuerzoInicio && perfilMedico.horaAlmuerzoFin) {
            if (horaConsulta >= perfilMedico.horaAlmuerzoInicio && horaConsulta <= perfilMedico.horaAlmuerzoFin) {
                return false;
            }
        }
        return true;
    }
    generarHorariosDisponibles(perfilMedico, citasOcupadas, fecha, duracion) {
        const horariosDisponibles = [];
        const horaInicio = perfilMedico.horaInicio || '08:00';
        const horaFin = perfilMedico.horaFin || '18:00';
        const intervalos = duracion;
        let horaActual = this.parseHora(horaInicio);
        const horaLimite = this.parseHora(horaFin);
        while (horaActual < horaLimite) {
            const horaString = this.formatearHora(horaActual);
            const fechaHoraCompleta = new Date(fecha + 'T' + horaString + ':00');
            if (this.estaEnHorarioAlmuerzo(horaString, perfilMedico)) {
                horaActual += intervalos;
                continue;
            }
            const hayConflicto = citasOcupadas.some(cita => {
                const inicioCita = new Date(cita.fechaHora);
                const finCita = new Date(inicioCita.getTime() + cita.duracion * 60000);
                const finConsulta = new Date(fechaHoraCompleta.getTime() + duracion * 60000);
                return (fechaHoraCompleta < finCita && finConsulta > inicioCita);
            });
            if (!hayConflicto) {
                horariosDisponibles.push(horaString);
            }
            horaActual += intervalos;
        }
        return horariosDisponibles;
    }
    parseHora(horaString) {
        const [horas, minutos] = horaString.split(':').map(Number);
        return horas * 60 + minutos;
    }
    formatearHora(minutos) {
        const horas = Math.floor(minutos / 60);
        const mins = minutos % 60;
        return `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }
    estaEnHorarioAlmuerzo(hora, perfilMedico) {
        if (!perfilMedico.horaAlmuerzoInicio || !perfilMedico.horaAlmuerzoFin) {
            return false;
        }
        return hora >= perfilMedico.horaAlmuerzoInicio && hora <= perfilMedico.horaAlmuerzoFin;
    }
    async obtenerCitaPorId(id) {
        const cita = await this.citasRepository.findOne({
            where: { id },
            relations: ['paciente', 'doctor', 'paciente.rol', 'doctor.rol']
        });
        if (!cita) {
            throw new common_1.NotFoundException('Cita no encontrada');
        }
        return cita;
    }
    async eliminarCita(id) {
        const cita = await this.obtenerCitaPorId(id);
        await this.citasRepository.remove(cita);
    }
};
exports.CitasService = CitasService;
exports.CitasService = CitasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cita_entity_1.Cita)),
    __param(1, (0, typeorm_1.InjectRepository)(perfil_medico_entity_1.PerfilMedico)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CitasService);
//# sourceMappingURL=citas.service.js.map