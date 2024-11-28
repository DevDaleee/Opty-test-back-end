import { Request } from 'express';
import { CashFlow } from '../entities/cashflow.entity';


export interface CashFlowRequest extends Request {
    cashFlow: CashFlow;
}