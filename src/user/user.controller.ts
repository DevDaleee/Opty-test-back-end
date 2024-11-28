import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('email')
  findByEmail(@CurrentUser() email: User) {
    return this.userService.findByEmail(email['email']);
  }

  @HttpCode(HttpStatus.OK)
  @Post('me')
  findOne(@CurrentUser() id: User) {
    return this.userService.findOne(id['id']);
  }

}