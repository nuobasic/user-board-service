import { DateColumns } from '../../dateColumm/dateColumns';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column(() => DateColumns, { prefix: false })
  dateColums: DateColumns;
}
