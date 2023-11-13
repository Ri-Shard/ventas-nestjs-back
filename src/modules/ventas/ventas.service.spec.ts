import { Test, TestingModule } from '@nestjs/testing';

import { of } from 'rxjs';

import { firstValueFrom } from 'rxjs';
import { VentasService } from './ventas.service';
import { VentaRepository } from 'repositories/venta.repository';
import { GetQueryDto } from 'dto/getQueryDto';
import { Prenda } from '../../entities/prenda.entity';
import { User } from '../../entities/user.entity';
import { Venta } from '../../entities/venta.entity';

describe('VentasService', () => {
 let service: VentasService;
 let repository: VentaRepository;

 beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VentasService,
        {
          provide: VentaRepository,
          useValue: {
            getVentas: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VentasService>(VentasService);
    repository = module.get<VentaRepository>(VentaRepository);
 });

 it('should be defined', () => {
    expect(service).toBeDefined();
 });

 describe('getVentas', () => {
    it('Debe retornar un array de ventas', async () => {
      const query: GetQueryDto = new GetQueryDto;
      const mockVenta: Venta = new Venta();
      mockVenta._id = '1';
      mockVenta.fecha = new Date().toString();
      mockVenta.productos = [new Prenda()];
      mockVenta.referencia = '1';
      mockVenta.total = '100000';
      mockVenta.usuario = new User();
      mockVenta.estado = 'completed';
      (repository.getVentas as jest.Mock).mockReturnValue(of([mockVenta]));
      const ventas = await service.getVentas(query);
      expect(Array.isArray(ventas)).toBe(true);
      expect(ventas).toContainEqual(mockVenta);
    });
});
});