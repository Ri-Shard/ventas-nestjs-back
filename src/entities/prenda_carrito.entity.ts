import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prenda, PrendaSchema } from './prenda.entity';


@Schema()
export class PrendaCarrito extends Document {

    @Prop({ type: PrendaSchema })
    producto: Prenda;

    @Prop({ type: Number })
    cantidad: number;

    @Prop({ type: String })
    color: string;

    @Prop({ type: String })
    talla: string;

    @Prop({ type: Number})
    totalProducto: number;

}

export const PrendaCarritoSchema = SchemaFactory.createForClass(PrendaCarrito);
