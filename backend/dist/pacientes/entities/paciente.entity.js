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
exports.Paciente = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let Paciente = class Paciente {
};
exports.Paciente = Paciente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Paciente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id', unique: true }),
    __metadata("design:type", Number)
], Paciente.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", user_entity_1.User)
], Paciente.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_identificacion', unique: true }),
    __metadata("design:type", String)
], Paciente.prototype, "numeroIdentificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tipo_identificacion',
        type: 'varchar',
        length: 10,
        default: 'CC'
    }),
    __metadata("design:type", String)
], Paciente.prototype, "tipoIdentificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_nacimiento', type: 'date' }),
    __metadata("design:type", Date)
], Paciente.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'masculino'
    }),
    __metadata("design:type", String)
], Paciente.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_civil', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "estadoCivil", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "ocupacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ciudad_residencia', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "ciudadResidencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'barrio', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "barrio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "eps", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_afiliacion', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "numeroAfiliacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_afiliacion', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "tipoAfiliacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto_emergencia_nombre', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "contactoEmergenciaNombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto_emergencia_telefono', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "contactoEmergenciaTelefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto_emergencia_parentesco', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "contactoEmergenciaParentesco", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "antecedentesMedicos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "antecedentesQuirurgicos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "antecedentesFamiliares", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "alergias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "medicamentosActuales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Paciente.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Paciente.prototype, "estatura", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grupo_sanguineo', nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "grupoSanguineo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'acepta_comunicaciones', default: true }),
    __metadata("design:type", Boolean)
], Paciente.prototype, "aceptaComunicaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prefiere_whatsapp', default: false }),
    __metadata("design:type", Boolean)
], Paciente.prototype, "prefiereWhatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prefiere_email', default: true }),
    __metadata("design:type", Boolean)
], Paciente.prototype, "prefiereEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prefiere_sms', default: false }),
    __metadata("design:type", Boolean)
], Paciente.prototype, "prefiereSms", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Paciente.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primera_consulta', default: true }),
    __metadata("design:type", Boolean)
], Paciente.prototype, "primeraConsulta", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_registro' }),
    __metadata("design:type", Date)
], Paciente.prototype, "fechaRegistro", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_actualizacion' }),
    __metadata("design:type", Date)
], Paciente.prototype, "fechaActualizacion", void 0);
exports.Paciente = Paciente = __decorate([
    (0, typeorm_1.Entity)('pacientes')
], Paciente);
//# sourceMappingURL=paciente.entity.js.map