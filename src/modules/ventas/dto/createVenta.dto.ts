import { IsOptional } from 'class-validator';
import { Prenda } from 'entities/prenda.entity';
import { User } from 'entities/user.entity';
import { Schema as MongooseSchema } from 'mongoose';


export class CreateVentaDto {

    _id: string;
    @IsOptional()
    fecha: string;
    @IsOptional()   
    productos: [Prenda];
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

