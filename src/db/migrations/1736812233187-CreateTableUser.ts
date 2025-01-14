import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1736812233187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name:'users-error-test',
                columns: [
                    {
                        name:'id',
                        type:'int',
                        isPrimary:true,
                        generationStrategy:'increment'
                    },
                    {
                        name:'name',
                        type:'varchar',
                        length:'100',
                        isNullable: true
                    },
                    {
                        name:'email',
                        type:'varchar',
                        length:'100',
                        isNullable: true  
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users-error-test')
    }

}
