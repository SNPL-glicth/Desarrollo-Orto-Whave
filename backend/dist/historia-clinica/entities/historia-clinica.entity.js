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
exports.HistoriaClinica = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const cita_entity_1 = require("../../citas/entities/cita.entity");
let HistoriaClinica = class HistoriaClinica {
};
exports.HistoriaClinica = HistoriaClinica;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HistoriaClinica.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paciente_id' }),
    __metadata("design:type", Number)
], HistoriaClinica.prototype, "pacienteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'paciente_id' }),
    __metadata("design:type", user_entity_1.User)
], HistoriaClinica.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doctor_id' }),
    __metadata("design:type", Number)
], HistoriaClinica.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'doctor_id' }),
    __metadata("design:type", user_entity_1.User)
], HistoriaClinica.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cita_id', nullable: true }),
    __metadata("design:type", Number)
], HistoriaClinica.prototype, "citaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cita_entity_1.Cita),
    (0, typeorm_1.JoinColumn)({ name: 'cita_id' }),
    __metadata("design:type", cita_entity_1.Cita)
], HistoriaClinica.prototype, "cita", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "motivoConsulta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "enfermedadActual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "antecedentesMedicos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "antecedentesQuirurgicos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "alergias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "medicamentosActuales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "examenFisico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "signosVitales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "diagnostico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "diagnosticoDiferencial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "tratamiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "examenesSolicitados", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "interconsultas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "recomendaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoriaClinica.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], HistoriaClinica.prototype, "proximaConsulta", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_consulta' }),
    __metadata("design:type", Date)
], HistoriaClinica.prototype, "fechaConsulta", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_actualizacion' }),
    __metadata("design:type", Date)
], HistoriaClinica.prototype, "fechaActualizacion", void 0);
exports.HistoriaClinica = HistoriaClinica = __decorate([
    (0, typeorm_1.Entity)('historias_clinicas')
], HistoriaClinica);
//# sourceMappingURL=historia-clinica.entity.js.map