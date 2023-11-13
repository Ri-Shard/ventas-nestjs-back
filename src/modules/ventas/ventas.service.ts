import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { CreateVentaDto } from './dto/createVenta.dto';
import { UpdateVentaDto } from './dto/updteVenta.dto';
import { VentaRepository } from 'repositories/venta.repository';
import { GetQueryDto } from 'dto/getQueryDto';

@Injectable()
export class VentasService {
    constructor(private ventaRepository: VentaRepository) {}

    async createVenta(createventaDto: CreateVentaDto, session: ClientSession) {
        return await this.ventaRepository.createVenta(createventaDto, session);
    }

    async getVentaById(ventaId: String) {
        return await this.ventaRepository.getVentaById(ventaId);
    }

    async getVentas(getQueryDto: GetQueryDto) {
        return await this.ventaRepository.getVentas(getQueryDto);
    }

    async updateVenta(updateVentaDto: UpdateVentaDto, session: ClientSession) {
        return await this.ventaRepository.updateVenta(updateVentaDto, session);
    }
}
