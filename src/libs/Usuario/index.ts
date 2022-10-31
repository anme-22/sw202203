import { getConnection } from "@server/dao/models/sqlite/SqliteConn";
import { UserDao } from "@server/dao/models/sqlite/UserDao";
export interface IUsuario {
    status: 'ACTIVO' | 'INACTIVO',
    firstName: String,
    secondName: String,
    birthDay: Date,
    phoneNumber?: String
    user: String,
    password: String
}
export class Usuario{
    private dao: UserDao;
    public constructor(){
        getConnection()
            .then(conn=>{
                this.dao = new UserDao(conn)
            })
            .catch(ex=>console.error(ex));
    }

    public getAllUsers() {
        this.dao.getUser()
    }

    public getUserByIndex(index:number) {
        return this.dao.getUserByID({_id:index});
        /*if(index >= 0 && index < this.itemUsuario.length)
        {
            return this.itemUsuario[index];
        }
        throw Error('Index out of range');*/
    }

    public addNewUser(usuario:IUsuario){
        return this.dao.insertNewUser(usuario);
        /*const userExists = this.itemUsuario.findIndex(
            (obj) => {
                obj.firstName === usuario.firstName && 
                obj.secondName === usuario.secondName && 
                obj.user === usuario.user && 
                obj.password === usuario.password;
            }
        );
        if (userExists < 0){
            this.itemUsuario.push(usuario);
            return this.itemUsuario.length -1;
        }
        throw Error('Item Exists on collection');*/
    }

    public updateUser( index:number, user:IUsuario) {
        return this.dao.update({_id:index}, user);
        // if(index>=0 && index < this.itemUsuario.length){
        //     this.itemUsuario[index] = user;
        //     return true;
        // }
        // return false;
    }

    public deleteUser(index:number) {
        return this.dao.deleteUser({_id: index})
        // if(index>=0 && index < this.itemUsuario.length){
            
        //     this.itemUsuario = this.itemUsuario.filter(
        //         (_obj: IUsuario, i:number)=> i !== index
        //     );
        //     return true;

        // }
        // return false;
    }
}