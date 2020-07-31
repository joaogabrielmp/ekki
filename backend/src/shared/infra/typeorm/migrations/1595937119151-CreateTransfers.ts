import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransfers1595937119151
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transfers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'send_user_id',
            type: 'uuid',
          },
          {
            name: 'receive_user_id',
            type: 'uuid',
          },
          {
            name: 'balance',
            type: 'numeric',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'TransfersSend',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['send_user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'TransfersReceive',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['receive_user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transfers');
  }
}
