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
exports.RegisterDto = void 0;
const class_validator_1 = require("class-validator");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El apellido debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El apellido es requerido' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "apellido", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Debe ser un correo electrónico válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El correo electrónico es requerido' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es requerida' }),
    (0, class_validator_1.MinLength)(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El teléfono debe ser una cadena de texto' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La dirección debe ser una cadena de texto' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "direccion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El rol debe ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'El rol debe ser mayor a 0' }),
    (0, class_validator_1.Max)(3, { message: 'El rol debe ser válido (1-3)' }),
    __metadata("design:type", Number)
], RegisterDto.prototype, "rolId", void 0);
//# sourceMappingURL=register.dto.js.map