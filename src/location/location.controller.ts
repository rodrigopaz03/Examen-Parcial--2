import {Body, Controller, Get, Post, UseGuards,} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiTokenGuard } from '../auth/api-token.guard'; 

@UseGuards(ApiTokenGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }
  
  @Get()
  findAllWithFavorites() {
    return this.locationService.findAllWithFavorites();
  }
}
