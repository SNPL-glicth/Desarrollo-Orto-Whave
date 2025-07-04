import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { PerfilMedico } from '../perfil-medico/entities/perfil-medico.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { CrearUsuarioAdminDto } from './dto/crear-usuario-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(PerfilMedico)
    private perfilMedicoRepository: Repository<PerfilMedico>,
    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>,
  ) {}

  async crearUsuarioAdmin(crearUsuarioDto: CrearUsuarioAdminDto): Promise<User> {
    // Verificar que el email no esté en uso
    const usuarioExistente = await this.usersRepository.findOne({
      where: { email: crearUsuarioDto.email }
    });

    if (usuarioExistente) {
      throw new ConflictException('El email ya está en uso');
    }

    // Verificar que el rol existe
    const rol = await this.rolesRepository.findOne({
      where: { id: crearUsuarioDto.rolId }
    });

    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(crearUsuarioDto.password, 12);

    // Crear el usuario
    const nuevoUsuario = this.usersRepository.create({
      email: crearUsuarioDto.email,
      password: hashedPassword,
      nombre: crearUsuarioDto.nombre,
      apellido: crearUsuarioDto.apellido,
      telefono: crearUsuarioDto.telefono,
      direccion: crearUsuarioDto.direccion,
      rolId: crearUsuarioDto.rolId,
      isVerified: true, // Los usuarios creados por admin están verificados automáticamente
      verificationCode: null
    });

    const usuarioGuardado = await this.usersRepository.save(nuevoUsuario);

    // Crear perfil específico según el rol
    if (rol.nombre === 'doctor' && crearUsuarioDto.perfilMedico) {
      await this.perfilMedicoRepository.save({
        usuarioId: usuarioGuardado.id,
        ...crearUsuarioDto.perfilMedico
      });
    } else if (rol.nombre === 'paciente' && crearUsuarioDto.perfilPaciente) {
      await this.pacientesRepository.save({
        usuarioId: usuarioGuardado.id,
        ...crearUsuarioDto.perfilPaciente,
        fechaNacimiento: new Date(crearUsuarioDto.perfilPaciente.fechaNacimiento)
      });
    }

    // Retornar usuario sin contraseña
    const { password, ...userData } = usuarioGuardado;
    return userData as User;
  }

  async obtenerTodosLosUsuarios(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['rol'],
      order: { fechaCreacion: 'DESC' },
      select: ['id', 'email', 'nombre', 'apellido', 'telefono', 'direccion', 'isVerified', 'fechaCreacion']
    });
  }

  async obtenerUsuariosPorRol(rolNombre: string): Promise<User[]> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rol', 'rol')
      .where('rol.nombre = :rolNombre', { rolNombre })
      .select(['user.id', 'user.email', 'user.nombre', 'user.apellido', 'user.telefono', 'user.isVerified', 'user.fechaCreacion'])
      .getMany();
  }

  async obtenerUsuarioPorId(id: number): Promise<User> {
    const usuario = await this.usersRepository.findOne({
      where: { id },
      relations: ['rol'],
      select: ['id', 'email', 'nombre', 'apellido', 'telefono', 'direccion', 'isVerified', 'fechaCreacion']
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  async actualizarUsuario(id: number, actualizarData: Partial<User>): Promise<User> {
    const usuario = await this.obtenerUsuarioPorId(id);

    // Si se incluye contraseña, hashearla
    if (actualizarData.password) {
      actualizarData.password = await bcrypt.hash(actualizarData.password, 12);
    }

    Object.assign(usuario, actualizarData);
    const usuarioActualizado = await this.usersRepository.save(usuario);

    const { password, ...userData } = usuarioActualizado;
    return userData as User;
  }

  async cambiarEstadoUsuario(id: number, activo: boolean): Promise<User> {
    const usuario = await this.obtenerUsuarioPorId(id);

    // Para "desactivar" usuarios, podemos usar isVerified o crear un campo activo
    usuario.isVerified = activo;
    const usuarioActualizado = await this.usersRepository.save(usuario);

    const { password, ...userData } = usuarioActualizado;
    return userData as User;
  }

  async eliminarUsuario(id: number): Promise<void> {
    const usuario = await this.obtenerUsuarioPorId(id);

    // En lugar de eliminar completamente, marcamos como inactivo
    usuario.isVerified = false;
    await this.usersRepository.save(usuario);
  }

  async buscarUsuarios(termino: string): Promise<User[]> {
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

  async verificarEmailDisponible(email: string): Promise<boolean> {
    const count = await this.usersRepository.count({ where: { email } });
    return count === 0;
  }

  async obtenerRoles(): Promise<Role[]> {
    return await this.rolesRepository.find({
      where: { activo: true },
      order: { nombre: 'ASC' }
    });
  }
}
