import { Request, Response } from "express";
import Usuario from '../models/usuario.model';


class UsuarioController {

   

    public async cadastrar(req: Request, res: Response): Promise<Response> {
        const usuario = await Usuario.create(req.body);
        return res.json(usuario);
    }

    public async autenticar(req: Request, res: Response): Promise<Response> {

        const { nome, senha } = req.body;

        const usuario = await Usuario.findOne({ nome });

        if (!usuario) {
            return res.status(400).send({ message: 'Usuário não encontrado!'});
        }

        if (!(await usuario.compareHash(senha))) {
            return res.status(400).json({ message: 'Senha inválida!' });
        }

        return res.json({
            usuario,
            token: usuario.generateToken()
        });
    }

   
}

export default new UsuarioController();