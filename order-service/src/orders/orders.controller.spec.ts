import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { OrdersController } from './orders.controller';
import { CreateOrderDto, OrderDetailDto } from './orders.dto';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;
  let req: Request;
  const mockOrderService = {
    createOrder: jest.fn(),
    getOrderDetail: jest.fn(),
    getOrder: jest.fn(),
    cancelOrder: jest.fn(),
    checkStatus: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(mockOrderService)
      .compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create order', () => {
    it('[Expect-success] Should call service to create order', async () => {
      mockOrderService.createOrder.mockResolvedValue(true);
      const result = await controller.createOrder(new CreateOrderDto(), req);
      expect(result).toBe(true);
    });
  });

  describe('get order detail', () => {
    it('[Expect-success] Should call service to get order detail', async () => {
      mockOrderService.getOrderDetail.mockResolvedValue(true);
      const result = await controller.getOrderDetail(new OrderDetailDto(), req);
      expect(result).toBe(true);
    });
  });

  describe('get order', () => {
    it('[Expect-success] Should call service to get order', async () => {
      mockOrderService.getOrder.mockResolvedValue(true);
      const result = await controller.getOrder(req);
      expect(result).toBe(true);
    });
  });

  describe('check status', () => {
    it('[Expect-success] Should call service to check status', async () => {
      mockOrderService.checkStatus.mockResolvedValue(true);
      const result = await controller.checkStatus(new OrderDetailDto(), req);
      expect(result).toBe(true);
    });
  });

  describe('cancel order', () => {
    it('[Expect-success] Should call service to cancel order', async () => {
      mockOrderService.cancelOrder.mockResolvedValue(true);
      const result = await controller.cancelOrder(new OrderDetailDto(), req);
      expect(result).toBe(true);
    });
  });
});
