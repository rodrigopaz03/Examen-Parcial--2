import {BadRequestException, Injectable,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {

    const { name, salary, employee } = createCharacterDto;
    const character = this.characterRepository.create({
      name: name,
      salary: salary,
      employee: employee,
    });

    return await this.characterRepository.save(character);
  }

  

  async addFavorite(characterId: string, locationId: string): Promise<Character> {
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
      relations: ['favPlaces'],
    });

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    if (!character.favPlaces) {
      character.favPlaces = [];
    }

    character.favPlaces.push(location);
    await this.characterRepository.save(character);
    

    return character;
  }


  async calculateTaxes(characterId: string): Promise<{ taxDebt: number }> {
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
      relations: ['property'],
    });

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    if (!character.property) {
      return { taxDebt: 0 };
    }

    const cost = character.property.cost;
    const coef = character.employee ? 0.08 : 0.03;

    const taxDebt = cost * (1 + coef);

    return { taxDebt };
  }
}
