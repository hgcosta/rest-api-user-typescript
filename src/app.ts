import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


export class App{
    private express: express.Application;
    private porta = 9000;


    constructor(){
        this.express = express();
        this.listen();
        this.database();
    }

    public getApp():express.Application {
        return this.express;
    }

    private listen():void{
        this.express.listen(this.porta, ()=>{
            console.log(`Servidor iniciado na porta ${this.porta}`);
        });
    }

    private database():void {
        mongoose.connect('mongodb+srv://hugo:hghavoc@cluster0.v1dmbxt.mongodb.net/?retryWrites=true&w=majority')
    }
}