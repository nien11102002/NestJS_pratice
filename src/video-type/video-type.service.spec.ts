import { Test, TestingModule } from '@nestjs/testing';
import { VideoTypeService } from './video-type.service';

describe('VideoTypeService', () => {
  let service: VideoTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoTypeService],
    }).compile();

    service = module.get<VideoTypeService>(VideoTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
