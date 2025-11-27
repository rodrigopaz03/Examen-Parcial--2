import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, 
    IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"
import { Location } from "../entities/location.entity";

export class CreateCharacterDto {
  
    @IsString()
    name: string;

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    salary: number;
    
    @ApiProperty()
    @IsBoolean()
    employee: boolean;
    
    @ApiProperty()
    @IsOptional()
    property: Location;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    favPlaces?: Location[];
}

