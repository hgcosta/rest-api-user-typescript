import {Router} from 'express'
import usuarioController from '../controllers/usuario.controller';

const UsuarioRoute = Router();

UsuarioRoute.post('/cadastro', usuarioController.cadastrar);


export default UsuarioRoute;