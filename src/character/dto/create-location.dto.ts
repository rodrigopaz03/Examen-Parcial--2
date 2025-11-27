import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, 
    IsString, MinLength } from "class-validator";
import { Location } from "../entities/location.entity";
import { Character } from "../entities/character.entity";

export class CreateLocationDto {
  
    @IsString()
    name: string;

    @IsString()
    type: string;
    
    @IsNumber()
    @IsPositive()
    cost: number;
    
    owner: Character;

}
