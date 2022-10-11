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
    
     public async  findAll(): Promise<T[]>{
        const sqlStr = `SELECT * FROM ${this.persistanceName};`;
        const datos = this.connection.all(sqlStr);
        return datos;
    }

     public async  findByID(identifier:Partial<T>): Promise<T>{
        const {columns, values, params:_params}= this.getColValParmArr(identifier);
        const sqlSelect = `SELECT * FROM ${this.persistanceName} WHERE ${columns.map(o=>`${o}=?`).join(' and ')};`;
        const dato = await this.connection.get(sqlSelect,values);
        return dato;
    }
    

    public async  createOne(data: T):Promise<T>{
        //const sqlStr= "INSERT INTO (...columns) values (...valores)";
        const {columns,values,params}=this.getColValParmArr(data);
        const sqlInsert=`INSERT INTO ${this.persistanceName} (${columns.join(', ')}) VALUES (${params.join(', ')})`;
        await this.connection.run(sqlInsert,values);
        return data;
    }
     public async update(identifier: Partial<T>, data: Partial<T>):Promise<boolean>{
        const {columns,values,params:_params}=this.getColValParmArr(data);
        const {columns:columnsId,values:valuesId,params:_paramsId}=this.getColValParmArr(identifier);
        const finalValues = [...values, ...valuesId];
        const sqlUpdate = `UPDATE ${this.persistanceName} SET ${columns.map((o)=>`${o}=?`).join(' ')} WHERE ${columnsId.map((o)=>`${o}=?`).join(' ')};`;
        await this.connection.exec(sqlUpdate, finalValues);
        return true;
    }
     public  async delete(identifier:Partial<T>):Promise<boolean>{

        const {columns,values,params: _params}=this.getColValParmArr(identifier);
        const sqlDelete= `DELETE from ${this.persistanceName} WHERE  ${columns.map(o=>`${o}=?`).join(' and ')};`;
        await this.connection.exec(sqlDelete, values);
        return true;
    }
     public findByFilter(){
        throw new Error("Not Implement");
    }
     public aggregate(){
        throw new Error("Not Implement");
    }

    public exec(sqlstr:string){
        return this.connection.exec(sqlstr);
    }

    private getColValParmArr(data:Partial<T>):{columns:string[], values:unknown[],params:string[]}{
        const columns= Object.keys(data);
        const values = Object.values(data);
        const params = columns.map(()=>'?');
        return{columns, values, params}
    }
}