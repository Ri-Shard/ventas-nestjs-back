import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaDto } from './createVenta.dto';

export class UpdateVentaDto extends PartialType(CreateVentaDto) {}