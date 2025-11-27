import {Body, Controller, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { ApiTokenGuard } from '../auth/api-token.guard';

@UseGuards(ApiTokenGuard)
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Patch(':id/favorites/:locationId')
  addFavorite(
    @Param('id') id: string,
    @Param('locationId') locationId: string,
  ) {
    return this.characterService.addFavorite(id, locationId);
  }

  @Get(':id/taxes')
  getTaxes(@Param('id') id: string) {
    return this.characterService.calculateTaxes(id);
  }
}
