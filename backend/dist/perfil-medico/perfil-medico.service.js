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
exports.PerfilMedicoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const perfil_medico_entity_1 = require("./entities/perfil-medico.entity");
const user_entity_1 = require("../users/entities/user.entity");
let PerfilMedicoService = class PerfilMedicoService {
    constructor(perfilMedicoRepository, usersRepository) {
        this.perfilMedicoRepository = perfilMedicoRepository;
        this.usersRepository = usersRepository;
    }
    async crearPerfilMedico(perfilData) {
        const perfil = this.perfilMedicoRepository.create(perfilData);
        return await this.perfilMedicoRepository.save(perfil);
    }
    async obtenerPorUsuarioId(usuarioId) {
        const perfil = await this.perfilMedicoRepository.findOne({
            where: { usuarioId },
            relations: ['usuario']
        });
        if (!perfil) {
            throw new common_1.NotFoundException('Perfil médico no encontrado');
        }
        return perfil;
    }
    async actualizarPerfil(usuarioId, actualizarData) {
        const perfil = await this.obtenerPorUsuarioId(usuarioId);
        Object.assign(perfil, actualizarData);
        return await this.perfilMedicoRepository.save(perfil);
    }
    async obtenerTodosLosDoctores() {
        return await this.perfilMedicoRepository.find({
            where: { activo: true },
            relations: ['usuario'],
            order: { fechaCreacion: 'DESC' }
        });
    }
    async obtenerDoctoresDisponibles() {
        return await this.perfilMedicoRepository.find({
            where: {
                activo: true,
                aceptaNuevosPacientes: true
            },
            relations: ['usuario'],
            order: { fechaCreacion: 'DESC' }
        });
    }
};
exports.PerfilMedicoService = PerfilMedicoService;
exports.PerfilMedicoService = PerfilMedicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(perfil_medico_entity_1.PerfilMedico)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PerfilMedicoService);
//# sourceMappingURL=perfil-medico.service.js.map