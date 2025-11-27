import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, 
    IsString, MinLength } from "class-validator";

export class CreateLocationDto {
  
    @IsString()
    name: string;

    @IsString()
    type: string;
    
    @IsNumber()
    @IsPositive()
    cost: number;
    
    @IsString()
    ownerId: string;

}
