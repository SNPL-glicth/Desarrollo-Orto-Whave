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
exports.Cita = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let Cita = class Cita {
};
exports.Cita = Cita;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cita.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paciente_id' }),
    __metadata("design:type", Number)
], Cita.prototype, "pacienteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'paciente_id' }),
    __metadata("design:type", user_entity_1.User)
], Cita.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doctor_id' }),
    __metadata("design:type", Number)
], Cita.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'doctor_id' }),
    __metadata("design:type", user_entity_1.User)
], Cita.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Cita.prototype, "fechaHora", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 60 }),
    __metadata("design:type", Number)
], Cita.prototype, "duracion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'pendiente'
    }),
    __metadata("design:type", String)
], Cita.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'primera_vez'
    }),
    __metadata("design:type", String)
], Cita.prototype, "tipoConsulta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cita.prototype, "motivoConsulta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cita.prototype, "notasDoctor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cita.prototype, "notasPaciente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Cita.prototype, "costo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion' }),
    __metadata("design:type", Date)
], Cita.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_actualizacion' }),
    __metadata("design:type", Date)
], Cita.prototype, "fechaActualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'aprobada_por', nullable: true }),
    __metadata("design:type", Number)
], Cita.prototype, "aprobadaPor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'aprobada_por' }),
    __metadata("design:type", user_entity_1.User)
], Cita.prototype, "aprobadaPorUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_aprobacion', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Cita.prototype, "fechaAprobacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cita.prototype, "razonRechazo", void 0);
exports.Cita = Cita = __decorate([
    (0, typeorm_1.Entity)('citas')
], Cita);
//# sourceMappingURL=cita.entity.js.map