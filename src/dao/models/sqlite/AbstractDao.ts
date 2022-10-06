import { IDaoObject } from "@server/dao/daoBase";
import sqlite3 from 'sqlite';
export  abstract class  AbstractDao<T>  implements IDaoObject {

    public persistanceName: string;
    private connection: sqlite3.Database;

    constructor(persistanceName: string, connection?: sqlite3.Database){
        this.persistanceName=persistanceName;
        if(connection){
            this.connection=connection;
        }
    }
    
     public findAll(): Promise<T[]>{
        throw new Error("Not Implement");
    }

     public findByID(): Promise<T>{
        throw new Error("Not Implement");
    }
    private getColValParmArr(data:Partial<T>):{columns:string[], values:unknown[],params:string[]}{
        const columns= Object.keys(data);
        const values = Object.values(data);
        const params = columns.map(()=>'?');
        return{columns, values, params}

    }
    public async  createOne(data: T):Promise<T>{
        //const sqlStr= "INSERT INTO (...columns) values (...valores)";
        const {columns,values,params}=this.getColValParmArr(data);
        const sqlInsert=`INSERT INTO ${this.persistanceName} (${columns.join(', ')}) VALUES (${params.join(', ')})`;
        await this.connection.exec(sqlInsert,values);
        return data;
    }
     public async update(identifier: Partial<T>, data: Partial<T>):Promise<boolean>{
        const {columns,values,params:_params}=this.getColValParmArr(data);
        const {columns:columnsId,values:valuesId,params:_paramsId}=this.getColValParmArr(identifier);
        const finalValues = [...values, ...valuesId];
        const sqlUpdate = `UPDATE ${this.persistanceName} SET ${columns.map((o)=>`${o}=?`).join(' ')} WHERE ${columnsId.map((o)=>`${o}=?`).join(' ')};`;
        await this.connection.exec(sqlUpdate,finalValues);
        return true;
    }
     public delete(){
        throw new Error("Not Implement");
    }
     public findByFilter(){
        throw new Error("Not Implement");
    }
     public aggregate(){
        throw new Error("Not Implement");
    }
}