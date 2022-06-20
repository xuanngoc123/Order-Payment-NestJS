import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { request, Request } from 'express';
import mongoose from 'mongoose';
import { STATUS } from '../commons/status.code';
import { ROLE_ENUM } from '../users/users.constant';
import {
  mockedCreateOrder,
  mockedExOrder,
  mockedExStatusOrder,
  mockedOrderDetail,
} from './orders.mock';
import { OrderRepository } from './orders.repository';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  const req: Request = request;
  req.user = {
    id: 1 as unknown as mongoose.Schema.Types.ObjectId,
    username: 'payload.userName',
    role: ROLE_ENUM.USER,
  };

  const MockOrderRepository = {
    createOrder: jest.fn(),
    findOne: jest.fn(),
    getOrder: jest.fn(),
    getOrderDetail: jest.fn(),
    findOneAndUpdate: jest.fn(),
    getStatus: jest.fn(),
    save: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        OrderRepository,
        {
          provide: getModelToken('Order'),
          useValue: MockOrderRepository,
        },
      ],
    })
      .overrideProvider(OrderRepository)
      .useValue(MockOrderRepository)
      .compile();

    service = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create order', () => {
    it('[Expect-Success] Should create order', async () => {
      MockOrderRepository.createOrder.mockResolvedValue(mockedExOrder);
      const result = await service.createOrder(mockedCreateOrder, req);
      expect(result).toEqual(mockedExOrder);
    });
  });

  describe('get order detail', () => {
    it('[Expect-Success] Should get order detail', async () => {
      MockOrderRepository.findOne.mockResolvedValue(mockedExOrder);
      const result = await service.getOrderDetail(mockedOrderDetail, req);
      expect(result).toEqual(mockedExOrder);
    });
    it('[Expect-Exception] Not found exception', async () => {
      try {
        await service.getOrderDetail(mockedOrderDetail, req);
      } catch (error) {
        expect(error.status).toEqual(STATUS.NOT_FOUND);
      }
    });
  });

  describe('get list order', () => {
    it('[Expect-Success] Should get list order', async () => {
      MockOrderRepository.getOrder.mockResolvedValue([mockedExOrder]);
      const result = await service.getOrder(req);
      expect(result).toEqual([mockedExOrder]);
    });
  });

  describe('cancel order', () => {
    it('[Expect-Success] Should cancel order', async () => {
      MockOrderRepository.findOneAndUpdate.mockResolvedValue(mockedExOrder);
      const result = await service.cancelOrder(mockedOrderDetail, req);
      expect(result).toEqual(mockedExOrder);
    });
    it('[Expect-Exception] Not found exception', async () => {
      try {
        await service.cancelOrder(mockedOrderDetail, req);
      } catch (error) {
        expect(error.status).toEqual(STATUS.NOT_FOUND);
      }
    });
  });

  describe('check stauts', () => {
    it('[Expect-Success] Should check status', async () => {
      MockOrderRepository.getStatus.mockResolvedValue(mockedExStatusOrder);
      const result = await service.checkStatus(mockedOrderDetail, req);
      expect(result).toEqual(mockedExStatusOrder);
    });

    it('[Expect-Exception] Not found exception', async () => {
      try {
        await service.checkStatus(mockedOrderDetail, req);
      } catch (error) {
        expect(error.status).toEqual(STATUS.NOT_FOUND);
      }
    });
  });
});
