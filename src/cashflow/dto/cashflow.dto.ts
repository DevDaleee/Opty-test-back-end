import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsNumber, Min, IsDate } from 'class-validator';

export class CreateCashFlowDto {
    @IsNotEmpty()
    @IsString()
    reason: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    amount: number;

    @IsNotEmpty()
    @IsBoolean()
    isCashIn: boolean;

    @IsOptional()
    @Type(() => Date) 
    @IsDate()
    createdAt?: Date; // Data opcional
}
export class CashFlowResponseDto {
    id: string;
    reason: string;
    description?: string;
    category: string;
    amount: number;
    isCashIn: boolean;
    createdAt: Date;
    userId: string;
}
