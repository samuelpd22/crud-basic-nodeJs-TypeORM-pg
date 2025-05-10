import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1736621013274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( 
            new Table( {
                name:'users_table',
                columns: [
                    {
                        name: 'id',
                        type:'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type:'varchar',
                        length:'100',
                        isNullable: false
                    },
                    {
                        name:'email',
                        type: 'varchar',
                        length: '100',
                        isNullable:false
                    },
                    {
                        name:'password',
                        type: 'varchar',
                        isNullable: true,
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_table')
    }

}
