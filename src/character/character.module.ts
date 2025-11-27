import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Location]),
  AuthModule],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
