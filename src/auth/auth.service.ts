import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/auth.entity';
import { randomBytes } from 'crypto';


  
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>, 
  ) {}

  async createToken(maxRequests: number): Promise<Token> {

    const value = randomBytes(32).toString('hex'); 

    const token = this.tokenRepository.create({
      token: value,
      reqLeft: maxRequests,
      active: true,
    });

    return await this.tokenRepository.save(token);
  }

  async ReduceToken(tokenValue: string) {

    const token = await this.tokenRepository.findOne({
      where: { token: tokenValue },
    });

    if (token != null) { 
      token.reqLeft -= 1;
      await this.tokenRepository.save(token);
      return token.reqLeft;
    }    
  }


async getUserToken(tokenValue: string){
    
    const token = await this.tokenRepository.findOne({
      where: { token: tokenValue},
    });
    if (token && token.reqLeft! > 0 && token.active) {
      return true;
    } else {
      throw new UnauthorizedException('API token is inactive or has no requests left');
    }
  }

}