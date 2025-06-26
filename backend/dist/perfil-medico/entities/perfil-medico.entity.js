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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfilMedico = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let PerfilMedico = class PerfilMedico {
};
exports.PerfilMedico = PerfilMedico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PerfilMedico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id', unique: true }),
    __metadata("design:type", Number)
], PerfilMedico.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", user_entity_1.User)
], PerfilMedico.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_registro_medico', unique: true }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "numeroRegistroMedico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PerfilMedico.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], PerfilMedico.prototype, "subespecialidades", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'universidad_egreso' }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "universidadEgreso", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'año_graduacion' }),
    __metadata("design:type", Number)
], PerfilMedico.prototype, "a\u00F1oGraduacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "biografia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'acepta_nuevos_pacientes', default: true }),
    __metadata("design:type", Boolean)
], PerfilMedico.prototype, "aceptaNuevosPacientes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tarifa_consulta', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], PerfilMedico.prototype, "tarifaConsulta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duracion_consulta_default', default: 60 }),
    __metadata("design:type", Number)
], PerfilMedico.prototype, "duracionConsultaDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono_consultorio', nullable: true }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "telefonoConsultorio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_consultorio', nullable: true }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "direccionConsultorio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "ciudad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dias_atencion', type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], PerfilMedico.prototype, "diasAtencion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hora_inicio', type: 'time', nullable: true }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "horaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hora_fin', type: 'time', nullable: true }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "horaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hora_almuerzo_inicio', type: 'time', nullable: true }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "horaAlmuerzoInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hora_almuerzo_fin', type: 'time', nullable: true }),
    __metadata("design:type", String)
], PerfilMedico.prototype, "horaAlmuerzoFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PerfilMedico.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verificado_colegio', default: false }),
    __metadata("design:type", Boolean)
], PerfilMedico.prototype, "verificadoColegio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_verificacion', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], PerfilMedico.prototype, "fechaVerificacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion' }),
    __metadata("design:type", Date)
], PerfilMedico.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_actualizacion' }),
    __metadata("design:type", Date)
], PerfilMedico.prototype, "fechaActualizacion", void 0);
exports.PerfilMedico = PerfilMedico = __decorate([
    (0, typeorm_1.Entity)('perfiles_medicos')
], PerfilMedico);
//# sourceMappingURL=perfil-medico.entity.js.map