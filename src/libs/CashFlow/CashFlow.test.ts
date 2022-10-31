import {ICashflow, CashFlow} from './index';
describe('CashFlow Lib Unit Tests', ()=>{
    //Es un debería de It should
    it('Should Create an Instances of CashFlow', ()=>{
        const cashFlowInstance = new CashFlow();
        expect(cashFlowInstance).toBeDefined();
    });
    it('Should add a new CashFlow Item', ()=>{
        const cashFlowInstance = new CashFlow();
        const cashFlowItem : ICashflow = {
            type: 'INCOME',
            date: new Date(),
            amount: 100,
            description: 'Receipt A101 from SW'
        }
        const index = cashFlowInstance.addCashFlow(cashFlowItem);
        expect(index).toBe(0);
    })
})