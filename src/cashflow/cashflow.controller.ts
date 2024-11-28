import { Controller, Post, Body, Request, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CashflowService } from './cashflow.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cashflow')
export class CashflowController {
    constructor(private readonly cashflowService: CashflowService) { }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post('addFlow')
    async addCashFlow(@Request() req, @Body() cashFlowData: { reason: string; description?: string; category: string; isCashIn: boolean }) {
        const userId = req.user.id;
        return this.cashflowService.addCashFlow(userId, cashFlowData);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post('deleteFlow')
    async deleteCashFlow(@Request() req, @Body('id') cashFlowId: string) {
        const userId = req.user.id;
        return this.cashflowService.deleteCashFlow(userId, cashFlowId);
    }
}
