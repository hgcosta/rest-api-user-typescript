import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRoute from './routes/usuario.route'

export class App{
    private express: express.Application;
    private porta = 9000;


    constructor(){
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }

    public getApp():express.Application {
        return this.express;
    }

    private middlewares():void{
        this.express.use(express.json());
        this.express.use(cors());
    }

    private listen():void{
        this.express.listen(this.porta, ()=>{
            console.log(`Servidor iniciado na porta ${this.porta}`);
        });
    }

    private database():void {
        mongoose.connect('mongodb+srv://hugo:hghavoc@cluster0.v1dmbxt.mongodb.net/?retryWrites=true&w=majority')
    }

    private routes():void{
        this.express.use('/usuarios', usuarioRoute);
    }
}