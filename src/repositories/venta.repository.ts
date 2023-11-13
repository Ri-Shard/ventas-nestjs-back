import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { CreateVentaDto } from 'modules/ventas/dto/createVenta.dto';
import { UpdateVentaDto } from 'modules/ventas/dto/updteVenta.dto';
import { Venta } from '../entities/venta.entity';



export class VentaRepository {
    constructor(@InjectModel(Venta.name) private readonly ventaModel: Model<Venta>) {}

    async createVenta(createVentaDto: CreateVentaDto, session: ClientSession) {
        let venta = new this.ventaModel({
            _id:createVentaDto._id,
            fecha:createVentaDto.fecha,
            productos:createVentaDto.productos,
            referencia:createVentaDto.referencia,
            total:createVentaDto.total,
            usuario:createVentaDto.usuario,
            estado:createVentaDto.estado
        });
        try {
            venta = await venta.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return venta;
    }

    async updateVenta(updateVenta: UpdateVentaDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            estado: updateVenta.estado,
        };

        let venta;
        try {
            venta = await this.ventaModel
                .findOneAndUpdate({ _id: updateVenta._id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!venta) {
            throw new ConflictException('Error trying to update venta');
        }

        return venta;
    }

    async getVentas(query: GetQueryDto) {
        return await this.ventaModel.find().exec();

    }

    async getVentaById(id: String) {
        let venta;
        try {
            venta = await this.ventaModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!venta) {
            throw new NotFoundException('La venta no existe');
        }

        return venta;
    }
}