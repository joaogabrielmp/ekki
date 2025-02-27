import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import TransferStatus from '@modules/transfers/enums/TransferStatus';

@Entity('transfers')
class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  send_user_id: string;

  @Column()
  receive_user_id: string;

  @Column()
  balance: number;

  @Column('text')
  status: TransferStatus;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Transfer;
