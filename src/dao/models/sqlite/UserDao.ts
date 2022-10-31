import { IUsuario } from '../entities/User'
import { AbstractDao } from './AbstractDao';
import sqlite from 'sqlite';

export class UserDao extends AbstractDao<IUsuario> {

  public constructor(db:sqlite.Database){
    super('User', db as sqlite.Database)
    super.exec('CREATE TABLE IF NOT EXISTS User '+
    '(_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'+
    'status TEXT,'+
    'firstName TEXT,'+
    'secondName TEXT,'+
    'birthDay TEXT,'+
    'phoneNumber TEXT,'+
    'user TEXT,'+
    'password TEXT);').then().catch(e=>console.error(e));
  }

  public async getUser() {
    return await super.findAll();
  }

  public async getUserByID( identifier: Partial<IUsuario>){
    try{
      const result = await super.findByID(identifier);
      return result;
    }catch(ex){
      console.log('User dao:', (ex as Error).message)
      throw ex;
    }
  }

  public async insertNewUser( newUser: IUsuario){
    try{
      const result = await super.createOne(newUser);
      return result;
    }
    catch(ex: unknown){
      console.log('Error User sqlite:', (ex as Error).message)
      throw ex;
    }
  }

  public async updateUser( updateUser: IUsuario){
    try{
      const{_id, ...updateObject} = updateUser;
      const result = await super.update({_id}, updateObject);
      return result;
    }
    catch(ex: unknown){
      console.log('UserDao sqlite:', (ex as Error).message);
      throw ex;
    }
  }

  public async deleteUser( deleteUser: Partial<IUsuario>){
    try{
      const{_id} = deleteUser;
      const result = await super.delete({_id});
      return result;
    }
    catch(ex: unknown){
      console.log('UserDao sqlite:', (ex as Error).message);
      throw ex;
    }
  }
}