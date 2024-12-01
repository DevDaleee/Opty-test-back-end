import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCashFlowDto } from './dto/cashflow.dto';

@Injectable()
export class CashflowService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async addCashFlow(userId: string, cashFlowData: CreateCashFlowDto) {
        const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            throw new UnauthorizedException('User not found');
        }
        const newCashFlow = await this.prisma.cashFlow.create({
            data: {
                ...cashFlowData,
                userId,
            },
        });
        return newCashFlow;
    }

    async deleteCashFlow(userId: string, cashFlowId: string) {
        const cashFlow = await this.prisma.cashFlow.findUnique({
            where: { id: cashFlowId },
        });

        if (!cashFlow) {
            throw new NotFoundException('CashFlow item not found');
        }
        if (cashFlow.userId !== userId) {
            throw new ForbiddenException('You are not allowed to delete this item');
        }
        return await this.prisma.cashFlow.delete({
            where: { id: cashFlowId },
        });
    }

    async getCashFlowsByUser(userId: string) {
        const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            throw new UnauthorizedException('User not found');
        }
        const cashFlows = await this.prisma.cashFlow.findMany({
            where: { userId },
        });
        return cashFlows;
    }

    async getCashFlowById(userId: string, cashFlowId: string) {
        const cashFlow = await this.prisma.cashFlow.findUnique({
            where: { id: cashFlowId },
        });

        if (!cashFlow) {
            throw new NotFoundException('CashFlow item not found');
        }
        if (cashFlow.userId !== userId) {
            throw new ForbiddenException('You are not allowed to view this item');
        }
        return cashFlow;
    }
}
