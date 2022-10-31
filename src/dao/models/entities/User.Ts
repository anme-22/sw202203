export interface IUsuario {
    status: 'ACTIVO' | 'INACTIVO',
    firstName: String,
    secondName: String,
    birthDay: Date,
    phoneNumber?: String
    user: String,
    password: String
    _id?:unknown
};