import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prenda, PrendaSchema } from './prenda.entity';
import { User, UserSchema } from './user.entity';


@Schema()
export class Venta extends Document {
    @Prop({ type: String})
    _id: string;

    @Prop({ type: String })
    fecha: string;

    @Prop({ type: [PrendaSchema] })
    productos: Prenda[];

    @Prop({ type: String })
    referencia: string;

    @Prop({ type: String })
    total: string;

    @Prop({ type: UserSchema  })
    usuario: User;

    @Prop({ type: String })
    estado: string;

}

export const VentaSchema = SchemaFactory.createForClass(Venta);
