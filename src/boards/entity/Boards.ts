import { DateColumns } from '../../dateColumm/dateColumns';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { Users } from 'src/users/entitiy/Users';

@Entity('boards')
export class Boards {
  @PrimaryGeneratedColumn()
  boardId: number;

  @Column()
  @MaxLength(20)
  title: string;

  @Column()
  @MaxLength(200)
  content: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column(() => DateColumns, { prefix: false })
  dateColums: DateColumns;

  @ManyToOne(() => Users, (users) => users.boards)
  users: Users;
}
