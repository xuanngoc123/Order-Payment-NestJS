import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { OrderDto } from './payments.dto';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  const mockPaymentService = {
    createPayment: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    })
      .overrideProvider(PaymentsService)
      .useValue(mockPaymentService)
      .compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('[Expect-success] Should call service to create', async () => {
      mockPaymentService.createPayment.mockResolvedValue(true);
      const result = await controller.createPayment(new OrderDto());
      expect(result).toBe(true);
    });
  });
});
