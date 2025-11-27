import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/auth.entity';
import { ApiTokenGuard } from './api-token.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [AuthController],
  providers: [AuthService,  AuthService,  ApiTokenGuard],
  exports: [TypeOrmModule,  AuthService,  ApiTokenGuard],
})
export class AuthModule {}
