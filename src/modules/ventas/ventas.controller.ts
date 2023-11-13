import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';

import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/createVenta.dto';
import { UpdateVentaDto } from './dto/updteVenta.dto';

@Controller('ventas')
export class VentasController {
  constructor( private  ventasService: VentasService, @InjectConnection() private readonly mongoConnection: Connection) {}


  @Post('/createVenta')
  async createVenta(@Body() createVentaDto: CreateVentaDto, @Res() res: Response) {
      const session = await this.mongoConnection.startSession();
      session.startTransaction();
      try {
          const newVenta: any = await this.ventasService.createVenta(createVentaDto, session);
          await session.commitTransaction();
          return res.status(HttpStatus.OK).send(newVenta);
      } catch (error) {
          await session.abortTransaction();
          throw new BadRequestException(error);
      } finally {
          session.endSession();
      }
  }

  @Put('/updateVenta/:id')
  async updateVenta(@Param('id') id: String, @Body() updateVentaDto: UpdateVentaDto, @Res() res: Response) {
      const session = await this.mongoConnection.startSession();
      session.startTransaction();
      try {
          const newVenta: any = await this.ventasService.updateVenta(updateVentaDto, session);
          await session.commitTransaction();
          return res.status(HttpStatus.OK).send(newVenta);
      } catch (error) {
          await session.abortTransaction();
          throw new BadRequestException(error);
      } finally {
          session.endSession();
      }
  }

  @Get('/getVentaById/:id')
  async getVentaById(@Param('id') id: String, @Res() res: Response) {
      const storage: any = await this.ventasService.getVentaById(id);
      return res.status(HttpStatus.OK).send(storage);
  }

  @Get('/getVentas')
  async getAllVentas(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
      const storages: any = await this.ventasService.getVentas(getQueryDto);
      return res.status(HttpStatus.OK).send(storages);
  }

}




