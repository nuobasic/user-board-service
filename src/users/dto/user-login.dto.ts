import { PickType } from '@nestjs/swagger';
import { Users } from '../entitiy/Users';

export class LogInUserDto extends PickType(Users, [
  'email',
  'password',
] as const) {}
