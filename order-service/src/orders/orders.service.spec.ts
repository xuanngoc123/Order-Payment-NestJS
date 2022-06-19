import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { request, Request } from 'express';
import mongoose from 'mongoose';
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
  class mockOrderModel {
    constructor(private data) {}
    new = jest.fn().mockResolvedValue(this.data);
    save = jest.fn().mockResolvedValue(this.data);
    // static find = jest.fn().mockResolvedValue(mockUser());
    // static create = jest.fn().mockResolvedValue(mockUser());
    static remove = jest.fn().mockResolvedValueOnce(true);
    static exists = jest.fn().mockResolvedValue(false);
    // static findOne = jest.fn().mockResolvedValue(mockUser());
    // static findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser());
    static findByIdAndDelete = jest.fn().mockReturnThis();
    static exec = jest.fn();
    static deleteOne = jest.fn().mockResolvedValue(true);
    static findById = jest.fn().mockReturnThis();
    static getStatus = jest.fn();
    static getOrder = jest.fn();
  }

  const MockOrderRepository = {
    createOrder: jest.fn(),
    findOne: jest.fn(),
    getOrder: jest.fn(),
    getOrderDetail: jest.fn(),
    getStauts: jest.fn(),
    findOneAndUpdate: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        OrderRepository,
        {
          provide: getModelToken('Order'),
          useValue: mockOrderModel,
        },
      ],
    })
      .overrideProvider(OrderRepository)
      .useValue(mockOrderModel)
      .compile();

    service = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create order', () => {
    it('[Expect-Success] Should create order', async () => {
      MockOrderRepository.createOrder.mockImplementation(() =>
        Promise.resolve(mockedExOrder),
      );
      const result = await service.createOrder(mockedCreateOrder, req);
      expect(result).toEqual(mockedExOrder);
    });
  });

  describe('create order', () => {
    it('[Expect-Success] Should create order', async () => {
      MockOrderRepository.createOrder.mockImplementation(() =>
        Promise.resolve(mockedExOrder),
      );
      const result = await service.createOrder(mockedCreateOrder, req);
      expect(result).toEqual(mockedExOrder);
    });
  });

  describe('get order detail', () => {
    it('[Expect-Success] Should get order detail', async () => {
      MockOrderRepository.getOrderDetail.mockImplementation(() =>
        Promise.resolve(mockedExOrder),
      );
      const result = await service.getOrderDetail(mockedOrderDetail, req);
      expect(result).toEqual(mockedExOrder);
    });
  });

  describe('get list order', () => {
    it('[Expect-Success] Should get list order', async () => {
      MockOrderRepository.getOrder.mockImplementation(() =>
        Promise.resolve([mockedExOrder]),
      );
      const result = await service.getOrder(req);
      expect(result).toEqual([mockedExOrder]);
    });
  });

  describe('cancel order', () => {
    it('[Expect-Success] Should cancel order', async () => {
      MockOrderRepository.findOneAndUpdate.mockImplementation(() =>
        Promise.resolve(mockedExOrder),
      );
      const result = await service.cancelOrder(mockedOrderDetail, req);
      expect(result).toEqual(mockedExOrder);
    });
  });

  describe('check stauts', () => {
    it('[Expect-Success] Should check status', async () => {
      MockOrderRepository.getStauts.mockImplementation(() =>
        Promise.resolve(mockedExStatusOrder),
      );
      const result = await service.checkStatus(mockedOrderDetail, req);
      expect(result).toEqual(mockedExStatusOrder);
    });
  });
});
