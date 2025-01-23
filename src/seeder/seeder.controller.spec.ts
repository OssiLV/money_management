import { Test, TestingModule } from '@nestjs/testing';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

describe('SeederController', () => {
    let controller: SeederController;

    // Mock the SeederService
    const mockSeederService = {
        seedData: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SeederController],
            providers: [
                {
                    provide: SeederService,
                    useValue: mockSeederService,
                },
            ],
        }).compile();

        controller = module.get<SeederController>(SeederController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
