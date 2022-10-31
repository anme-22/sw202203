import { Router } from "express";
import { IUsuario, Usuario } from "@server/libs/Usuario";

const router = Router();
const userInstance = new Usuario();

router.get('/', async (_req, res) =>{
    try{
        res.json(await userInstance.getAllUsers);
    }
    catch(ex)
    {
        console.error(ex); 
        res.status(503).json({error:ex});
    }
})

router.get('/byindex/:index', async (req, res) =>{
    try{
        const { index } = req.params;
        res.json(await userInstance.getUserByIndex(+index));
    }
    catch(error){
        console.log('Error', error);
        res.status(300).json({'msg':'Error al obtener registros del usuario'});
    }
})

router.post('/new', async (req, res) => {
    try{
        const newUser = req.body as unknown as IUsuario;
        const newUserIndex = await userInstance.addNewUser(newUser);
        res.json({newIndex:newUserIndex});
    }
    catch(error){
        console.log('Error', error);
        res.status(500).json({error: (error as Error).message});
    }
})

router.put('/update/:index', async (req, res) => {
    try{
        const { index } = req.params;
        const userFromForm = req.body as IUsuario;
        await userInstance.updateUser(+index, userFromForm);
        res.status(200).json({"msg":"Registro Acutualizado"});
    }
    catch(error) {
        res.status(500).json({error: (error as Error).message});
    }
})

router.delete('/delete/:index', (req, res) => {
    try{
        const {index} = req.params;
        if ( userInstance.deleteUser(+index))
        {
            res.status(200).json({"msg":"Registro Eliminado"});
        }
        else
        {
            res.status(500).json({"msg":"Error al eliminar el registro"});
        }
    }
    catch(error) {
        console.log('Error', error);
        res.status(500).json({error: (error as Error).message});
    }
})
export default router;