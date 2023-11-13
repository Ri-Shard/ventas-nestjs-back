import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { VentaRepository } from 'repositories/venta.repository';
import { Venta, VentaSchema } from 'entities/venta.entity';

@Module({
 controllers: [VentasController],
 imports: [MongooseModule.forFeature([{ name: Venta.name, schema: VentaSchema }])],
 providers: [VentasService, VentaRepository],
 exports: [VentasService, VentaRepository],
})
export class VentasModule {}