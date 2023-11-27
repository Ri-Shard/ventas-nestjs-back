import { IsOptional } from 'class-validator';
import { Prenda } from 'entities/prenda.entity';
import { PrendaCarrito } from 'entities/prenda_carrito.entity';
import { User } from 'entities/user.entity';
import { Schema as MongooseSchema } from 'mongoose';


export class CreateVentaDto {

    @IsOptional()
    fecha: string;
    @IsOptional()   
    productos: [PrendaCarrito];
    @IsOptional()
    referencia: string;
    @IsOptional()
    total: string;
    @IsOptional()
    usuario: [User];
    @IsOptional()
    categorias: [string];
    @IsOptional()
    personalizacion: [string];
    @IsOptional()
    estado: string;

}

