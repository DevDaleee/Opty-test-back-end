import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCashFlowDto {
    @IsOptional()
    @IsString()
    reason?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsBoolean()
    isCashIn?: boolean;

    @IsOptional()
    @Type(() => Date) 
    @IsDate()
    createdAt?: Date
}
