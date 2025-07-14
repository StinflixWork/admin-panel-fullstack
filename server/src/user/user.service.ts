import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { hash } from 'argon2';
import { CreateUserDto, UpdateUserDto } from './dto/create-user-dto';
import { PaginationArgsWithSearchTerm } from '../base/pagination/pagination.args';
import { isHasMorePagination } from '../base/pagination/is-has-more';
import { UserResponse } from './user.response';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    const userEmail = await this.prisma.user.findUnique({ where: { email } });
    if (!userEmail) {
      throw new NotFoundException('User email not found');
    }

    return userEmail;
  }

  async findAll(args?: PaginationArgsWithSearchTerm): Promise<UserResponse> {
    const searchTermQuery = args?.searchTerm
      ? this.getSearchTermFilter(args?.searchTerm)
      : {};

    const users = await this.prisma.user.findMany({
      skip: Number(args?.skip),
      take: Number(args?.take),
      where: searchTermQuery,
    });

    const totalCount = await this.prisma.user.count({
      where: searchTermQuery,
    });

    const isHasMore = isHasMorePagination(
      totalCount,
      Number(args?.skip),
      Number(args?.take),
    );

    return { items: users, isHasMore };
  }

  async create({ password, ...dto }: CreateUserDto) {
    const user = {
      ...dto,
      password: await hash(password),
    };

    return this.prisma.user.create({ data: user });
  }

  async update(id: number, { password, ...data }: UpdateUserDto) {
    await this.findById(id);

    const hashedPassword = password ? { password: await hash(password) } : {};

    return this.prisma.user.update({
      where: { id },
      data: { ...data, ...hashedPassword },
    });
  }

  async delete(id: string) {
    await this.findById(+id);

    return this.prisma.user.delete({ where: { id: +id } });
  }

  private getSearchTermFilter(searchTerm: string): Prisma.UserWhereInput {
    return {
      OR: [
        {
          email: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          country: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    };
  }
}
