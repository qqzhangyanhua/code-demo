import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  // 获取所有用户数据列表(usersRepository.query()方法属于typeoram)
  async getList(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // 通过id查询用户
  async getUserById(id): Promise<User> {
    return await this.usersRepository.findOne({ where: { id: id } });
  }
  // 新增用户
  async addUser(body): Promise<User> {
    return await this.usersRepository.save(body);
  }
  // 更新用户
  async updateUser(user): Promise<string> {
    await this.usersRepository.update({ id: user.id }, user);
    return '更新成功';
  }

  // 删除用户
  async deleteUser(params): Promise<object> {
    const res = await this.usersRepository.delete({ id: params.id });
    if (res.affected > 0) {
      return {
        code: 0,
        data: '',
        msg: '删除成功',
      };
    } else {
      return {
        code: 0,
        data: '',
        msg: '删除失败',
      };
    }
  }
}
