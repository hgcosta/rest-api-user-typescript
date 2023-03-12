import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UsuarioInterface } from '../interfaces/usuario.interface';

interface UsuarioModel extends UsuarioInterface, Document {
    compareHash(data: string): Promise<boolean>;
    generateToken(): string;
}

// interface UsuarioStatic extends Model<UsuarioModel> {
//     buscaTodosChat(idUsuario: string): DocumentQuery<UsuarioModel[], UsuarioModel>;
// }

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
});



UsuarioSchema.pre<UsuarioModel>('save', function createAvatar() {
    const randomId = Math.floor(Math.random() * (1000000)) + 1;

    this.avatar = `https://api.adorable.io/avatars/285/${randomId}.png`;
});

UsuarioSchema.methods.compareHash = function(hash: string): Promise<boolean> {
    return bcrypt.compare(hash, this.senha);
}



export default model<UsuarioModel>('Usuario', UsuarioSchema);