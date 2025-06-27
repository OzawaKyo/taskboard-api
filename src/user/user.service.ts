import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: { email: string; password: string; name?: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateRefreshToken(userId: number, refreshToken: string | null): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken }
    });
  }
}
