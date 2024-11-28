import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CashflowService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) { }

    async addCashFlow(userId: number, cashFlowData: { reason: string; description?: string; category: string; isCashIn: boolean }) {
        const user = await this.userService.findOne(userId);
        if (!user) {
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

    async deleteCashFlow(userId: number, cashFlowId: string) {
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
}
