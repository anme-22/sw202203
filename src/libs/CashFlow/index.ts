

 export interface ICashFlow{
    type:'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    description: String;
};
 export class CashFlow{
    private cashFlowItems: ICashFlow[]=[];
    //Consultas
    public getAllCashFlow(): ICashFlow[]{
        return this.cashFlowItems;// select * from cashflow;
    }

    public getCashFlowByIndex(index:number): ICashFlow{
        if(index >= 0 && index<this.cashFlowItems.length){
            return this.cashFlowItems[index]
        }
        throw Error('Index out of range');
    }

    public addCashFlow(cashFlow:ICashFlow):number{
        const cashFlowExists=this.cashFlowItems.findIndex(
            (obj)=>{
                return obj.amount == cashFlow.amount && obj.description ==cashFlow.description;
            }
        );
        if(cashFlowExists<0){
            this.cashFlowItems.push(cashFlow);
            return this.cashFlowItems.length-1;
        }
        throw Error('CashFlow Exists on Collection');
    }

    public updateCashFlow(index:number, cashFlow:ICashFlow):boolean{
        if(index >= 0 && index < this.cashFlowItems.length){
            this.cashFlowItems[index]= cashFlow;
            return true;
        }
        return false;
    }
    public deleteCashFlow(index:number): boolean{
        if(index >= 0 && index < this.cashFlowItems.length){
            this.cashFlowItems= this.cashFlowItems.filter(
                (_obj:ICashFlow,i:number)=>i !==index
            );
            return true;
        }
        return false;
    }
}

