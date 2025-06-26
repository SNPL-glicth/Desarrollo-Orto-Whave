"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnsToRoles1709942400001 = void 0;
class AddColumnsToRoles1709942400001 {
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE roles 
            ADD COLUMN activo BOOLEAN DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE roles 
            ADD COLUMN fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE roles 
            DROP COLUMN fecha_creacion
        `);
        await queryRunner.query(`
            ALTER TABLE roles 
            DROP COLUMN activo
        `);
    }
}
exports.AddColumnsToRoles1709942400001 = AddColumnsToRoles1709942400001;
//# sourceMappingURL=1709942400001-AddColumnsToRoles.js.map