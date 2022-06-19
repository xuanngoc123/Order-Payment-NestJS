import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedCreatePayment, mockedExPayment } from './payments.mock';
import { PaymentRepository } from './payments.repository';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;

  class mockPaymentModel {
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
    static findProduct = jest.fn();
  }

  const MockPaymentRepository = {
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        PaymentRepository,
        {
          provide: getModelToken('Payment'),
          useValue: mockPaymentModel,
        },
      ],
    })
      .overrideProvider(PaymentRepository)
      .useValue(MockPaymentRepository)
      .compile();

    service = module.get<PaymentsService>(PaymentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('[Expect-Success] Should create payment', async () => {
      MockPaymentRepository.create.mockImplementation(() =>
        Promise.resolve(mockedExPayment),
      );
      const result = await service.createPayment(mockedCreatePayment);
      expect(result).toEqual(mockedExPayment);
    });
  });
});
