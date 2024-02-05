import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('list')
  getList(): Promise<User[]> {
    return this.userService.getList();
  }
  // 通过id查询用户
  @Get('getUserById')
  async getUserById(@Query('id') id: string): Promise<User> {
    const userId: number = parseInt(id);
    return this.userService.getUserById(userId);
  }
  // 增加用户
  @Post('addUser')
  addUser(@Body() body): Promise<User> {
    return this.userService.addUser(body);
  }
  // 更新用户
  @Post('updateUser')
  updateUser(@Body() body): Promise<string> {
    return this.userService.updateUser(body);
  }
  // 删除用户
  @Post('deleteUser')
  delUser(@Body() body): Promise<object> {
    return this.userService.deleteUser(body);
  }
}
