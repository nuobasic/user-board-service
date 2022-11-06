import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { Users } from '../../users/entitiy/Users';

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

  @ManyToOne(() => Users, (users) => users.boards)
  users: Users;
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
