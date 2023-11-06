import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParamUserIdDto } from './dto/params-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') params: ParamUserIdDto) {
    return this.usersService.findOne(params);
  }

  @Patch(':id')
  update(
    @Param('id') params: ParamUserIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(params, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') params: ParamUserIdDto) {
    return this.usersService.remove(params);
  }
}
