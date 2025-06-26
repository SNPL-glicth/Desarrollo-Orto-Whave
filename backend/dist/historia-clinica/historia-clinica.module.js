"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriaClinicaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const historia_clinica_service_1 = require("./historia-clinica.service");
const historia_clinica_controller_1 = require("./historia-clinica.controller");
const historia_clinica_entity_1 = require("./entities/historia-clinica.entity");
const user_entity_1 = require("../users/entities/user.entity");
let HistoriaClinicaModule = class HistoriaClinicaModule {
};
exports.HistoriaClinicaModule = HistoriaClinicaModule;
exports.HistoriaClinicaModule = HistoriaClinicaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([historia_clinica_entity_1.HistoriaClinica, user_entity_1.User])
        ],
        controllers: [historia_clinica_controller_1.HistoriaClinicaController],
        providers: [historia_clinica_service_1.HistoriaClinicaService],
        exports: [historia_clinica_service_1.HistoriaClinicaService]
    })
], HistoriaClinicaModule);
//# sourceMappingURL=historia-clinica.module.js.map