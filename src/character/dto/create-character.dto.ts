import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, 
    IsString, MinLength } from "class-validator";

export class CreateCharacterDto {
  
    @IsString()
    name: string;

    @IsPositive()
    @IsNumber()
    salary: number;
    
    @IsBoolean()
    employee: boolean;
    
}

