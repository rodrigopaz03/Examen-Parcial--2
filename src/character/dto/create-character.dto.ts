import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, 
    IsString, MinLength } from "class-validator";
import { Location } from "../entities/location.entity";

export class CreateCharacterDto {
  
    @IsString()
    name: string;

    @IsPositive()
    @IsNumber()
    salary: number;
    
    @IsBoolean()
    employee: boolean;
    
    @IsOptional()
    property: Location;

    @IsOptional()
    @IsArray()
    favPlaces?: Location[];
}

