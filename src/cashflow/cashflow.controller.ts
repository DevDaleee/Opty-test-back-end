import { Controller, Post, Body, Request, UseGuards, HttpCode, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { CashflowService } from './cashflow.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CashFlowResponseDto, CreateCashFlowDto } from './dto/cashflow.dto';
import { UpdateCashFlowDto } from './dto/update-cashflow.dto';

@Controller('cashflow')
export class CashflowController {
    constructor(private readonly cashflowService: CashflowService) { }

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addCashFlow(
        @Request() req,
        @Body() createCashFlowDto: CreateCashFlowDto,
    ): Promise<CashFlowResponseDto> {
        const userId = req.user.id;
        return this.cashflowService.addCashFlow(userId, createCashFlowDto);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteCashFlow(@Request() req, @Body('id') cashFlowId: string) {
        const userId = req.user.id;
        return this.cashflowService.deleteCashFlow(userId, cashFlowId);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Get('getAll')
    async getAllCashFlows(@Request() req) {
        const userId = req.user.id;
        return this.cashflowService.getCashFlowsByUser(userId);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCashFlowById(@Request() req, @Param('id') cashFlowId: string) {
        const userId = req.user.id;
        return this.cashflowService.getCashFlowById(userId, cashFlowId);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCashFlow(
        @Request() req,
        @Param('id') cashFlowId: string,
        @Body() updateCashFlowDto: UpdateCashFlowDto,
    ): Promise<CashFlowResponseDto> {
        const userId = req.user.id;
        return this.cashflowService.updateCashFlow(
            userId,
            cashFlowId,
            updateCashFlowDto,
        );
    }
}
