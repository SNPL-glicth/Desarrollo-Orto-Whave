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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const perfil_medico_entity_1 = require("../perfil-medico/entities/perfil-medico.entity");
const paciente_entity_1 = require("../pacientes/entities/paciente.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository, rolesRepository, perfilMedicoRepository, pacientesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.perfilMedicoRepository = perfilMedicoRepository;
        this.pacientesRepository = pacientesRepository;
    }
    async crearUsuarioAdmin(crearUsuarioDto) {
        const usuarioExistente = await this.usersRepository.findOne({
            where: { email: crearUsuarioDto.email }
        });
        if (usuarioExistente) {
            throw new common_1.ConflictException('El email ya está en uso');
        }
        const rol = await this.rolesRepository.findOne({
            where: { id: crearUsuarioDto.rolId }
        });
        if (!rol) {
            throw new common_1.NotFoundException('Rol no encontrado');
        }
        const hashedPassword = await bcrypt.hash(crearUsuarioDto.password, 12);
        const nuevoUsuario = this.usersRepository.create({
            email: crearUsuarioDto.email,
            password: hashedPassword,
            nombre: crearUsuarioDto.nombre,
            apellido: crearUsuarioDto.apellido,
            telefono: crearUsuarioDto.telefono,
            direccion: crearUsuarioDto.direccion,
            rolId: crearUsuarioDto.rolId,
            isVerified: true,
            verificationCode: null
        });
        const usuarioGuardado = await this.usersRepository.save(nuevoUsuario);
        if (rol.nombre === 'doctor' && crearUsuarioDto.perfilMedico) {
            await this.perfilMedicoRepository.save({
                usuarioId: usuarioGuardado.id,
                ...crearUsuarioDto.perfilMedico
            });
        }
        else if (rol.nombre === 'paciente' && crearUsuarioDto.perfilPaciente) {
            await this.pacientesRepository.save({
                usuarioId: usuarioGuardado.id,
                ...crearUsuarioDto.perfilPaciente,
                fechaNacimiento: new Date(crearUsuarioDto.perfilPaciente.fechaNacimiento)
            });
        }
        const { password, ...userData } = usuarioGuardado;
        return userData;
    }
    async obtenerTodosLosUsuarios() {
        return await this.usersRepository.find({
            relations: ['rol'],
            order: { fechaCreacion: 'DESC' },
            select: ['id', 'email', 'nombre', 'apellido', 'telefono', 'direccion', 'isVerified', 'fechaCreacion']
        });
    }
    async obtenerUsuariosPorRol(rolNombre) {
        return await this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.rol', 'rol')
            .where('rol.nombre = :rolNombre', { rolNombre })
            .select(['user.id', 'user.email', 'user.nombre', 'user.apellido', 'user.telefono', 'user.isVerified', 'user.fechaCreacion'])
            .getMany();
    }
    async obtenerUsuarioPorId(id) {
        const usuario = await this.usersRepository.findOne({
            where: { id },
            relations: ['rol'],
            select: ['id', 'email', 'nombre', 'apellido', 'telefono', 'direccion', 'isVerified', 'fechaCreacion']
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }
    async actualizarUsuario(id, actualizarData) {
        const usuario = await this.obtenerUsuarioPorId(id);
        if (actualizarData.password) {
            actualizarData.password = await bcrypt.hash(actualizarData.password, 12);
        }
        Object.assign(usuario, actualizarData);
        const usuarioActualizado = await this.usersRepository.save(usuario);
        const { password, ...userData } = usuarioActualizado;
        return userData;
    }
    async cambiarEstadoUsuario(id, activo) {
        const usuario = await this.obtenerUsuarioPorId(id);
        usuario.isVerified = activo;
        const usuarioActualizado = await this.usersRepository.save(usuario);
        const { password, ...userData } = usuarioActualizado;
        return userData;
    }
    async eliminarUsuario(id) {
        const usuario = await this.obtenerUsuarioPorId(id);
        usuario.isVerified = false;
        await this.usersRepository.save(usuario);
    }
    async buscarUsuarios(termino) {
        return await this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.rol', 'rol')
            .where('user.nombre LIKE :termino', { termino: `%${termino}%` })
            .orWhere('user.apellido LIKE :termino', { termino: `%${termino}%` })
            .orWhere('user.email LIKE :termino', { termino: `%${termino}%` })
            .select(['user.id', 'user.email', 'user.nombre', 'user.apellido', 'user.telefono', 'user.isVerified'])
            .getMany();
    }
    async obtenerEstadisticasUsuarios() {
        const total = await this.usersRepository.count();
        const verificados = await this.usersRepository.count({ where: { isVerified: true } });
        const admins = await this.usersRepository.count({
            where: { rol: { nombre: 'admin' } },
            relations: ['rol']
        });
        const doctores = await this.usersRepository.count({
            where: { rol: { nombre: 'doctor' } },
            relations: ['rol']
        });
        const pacientes = await this.usersRepository.count({
            where: { rol: { nombre: 'paciente' } },
            relations: ['rol']
        });
        return {
            total,
            verificados,
            noVerificados: total - verificados,
            distribuciones: {
                admins,
                doctores,
                pacientes
            }
        };
    }
    async verificarEmailDisponible(email) {
        const count = await this.usersRepository.count({ where: { email } });
        return count === 0;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(perfil_medico_entity_1.PerfilMedico)),
    __param(3, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map