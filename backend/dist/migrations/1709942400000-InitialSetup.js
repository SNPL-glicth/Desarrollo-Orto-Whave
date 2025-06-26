"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSetup1709942400000 = void 0;
class InitialSetup1709942400000 {
    constructor() {
        this.name = 'InitialSetup1709942400000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE roles (
                id INT NOT NULL AUTO_INCREMENT,
                nombre VARCHAR(255) NOT NULL,
                activo BOOLEAN NOT NULL DEFAULT true,
                fechaCreacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                UNIQUE INDEX IDX_nombre_unico (nombre),
                PRIMARY KEY (id)
            ) ENGINE=InnoDB;
        `);
        await queryRunner.query(`
            INSERT INTO roles (nombre) VALUES 
            ('admin'),
            ('doctor'),
            ('paciente');
        `);
        await queryRunner.query(`
            CREATE TABLE usuarios (
                id INT NOT NULL AUTO_INCREMENT,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                apellido VARCHAR(255) NOT NULL,
                telefono VARCHAR(255),
                direccion TEXT,
                rol_id INT NOT NULL,
                fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                isVerified BOOLEAN NOT NULL DEFAULT false,
                verificationCode VARCHAR(10),
                UNIQUE INDEX IDX_email_unico (email),
                PRIMARY KEY (id),
                FOREIGN KEY (rol_id) REFERENCES roles(id)
            ) ENGINE=InnoDB;
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS usuarios`);
        await queryRunner.query(`DROP TABLE IF EXISTS roles`);
    }
}
exports.InitialSetup1709942400000 = InitialSetup1709942400000;
//# sourceMappingURL=1709942400000-InitialSetup.js.map