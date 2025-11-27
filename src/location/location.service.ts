// src/location/location.service.ts
import {BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Character } from 'src/character/entities/character.entity';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const { name, type, cost, ownerId } = createLocationDto;

    const owner = await this.characterRepository.findOne({
      where: { id: ownerId },
      relations: ['property'],
    });

    if (!owner) {
      throw new NotFoundException('Owner character not found');
    }

    if (owner.property) {
      throw new BadRequestException('Owner already has a property');
    }

    const location = this.locationRepository.create({
      name: name,
      type: type,
      cost: cost,
      owner: owner
    });

    const savedLocation = await this.locationRepository.save(location);
    owner.property = savedLocation;
    await this.characterRepository.save(owner);

    return savedLocation;
  }

  async findAllWithFavorites() {
    const locations = await this.locationRepository.find({
      relations: ['owner', 'favCharacters'],
    });

    return locations;
  }
}
