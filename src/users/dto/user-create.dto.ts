import { PickType } from '@nestjs/swagger';
import { Users } from '../entitiy/Users';

export class CreateUserDto extends PickType(Users, [
  'email',
  'password',
] as const) {}
