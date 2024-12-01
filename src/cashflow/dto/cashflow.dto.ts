import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsNumber, Min } from 'class-validator';

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
