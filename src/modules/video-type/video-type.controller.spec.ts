import { Test, TestingModule } from '@nestjs/testing';
import { VideoTypeController } from './video-type.controller';
import { VideoTypeService } from './video-type.service';

describe('VideoTypeController', () => {
  let controller: VideoTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoTypeController],
      providers: [VideoTypeService],
    }).compile();

    controller = module.get<VideoTypeController>(VideoTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
