import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddColumnsToRoles1709942400001 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
