import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


@Schema()
export class User extends Document {

    @Prop({ type: String })
    nombre: string;

    @Prop({ type: String })
    apellido: string;

    @Prop({ type: String })
    contraseña: string;

    @Prop({ type: String })
    correo: string;

    @Prop({ type: String })
    direccion: string;

    @Prop({ type: String })
    rol: string;

    @Prop({ type: String })
    ciudad: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
