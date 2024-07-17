import { BaseService } from 'medusa-interfaces';
import { EntityManager } from 'typeorm';
import PodcastRepository from '../repositories/podcast';
import { Podcast } from '../models/podcast';
import { uploadFileToSupabase } from '../utils/uploadFileToSupabase';
import { MedusaError } from 'medusa-core-utils';
class PodcastService extends BaseService {
  private manager: EntityManager;
  private podcastRepository: any;

  constructor({ manager }) {
    super();
    this.manager = manager;
    this.podcastRepository = PodcastRepository;
  }

  async create(data: any): Promise<Podcast> {
    return await this.manager.transaction(async (transactionManager) => {
      const podcastRepo = transactionManager.withRepository(this.podcastRepository);
  
      let imageUrl = null;
      let audioUrl = null;
      // console.log(data);
       console.log("data",data.image);
      if (data.image) {
        imageUrl = await uploadFileToSupabase(data.image, `podcast/images/${data.image.newFilename}`);
        if (!imageUrl) {
          throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Failed to upload image');
        }
      }
  
      if (data.audio) {
        audioUrl = await uploadFileToSupabase(data.audio, `podcast/audios/${data.audio.newFilename}`);
        if (!audioUrl) {
          throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Failed to upload audio');
        }
      }
  
      const podcastData = {
        ...data,
        image_url: imageUrl,
        audio_file: audioUrl,
      };
  
      const podcast = podcastRepo.create(podcastData);
      return await podcastRepo.save(podcast);
    });
  }
  






  async list(): Promise<Podcast[]> {
    return await this.podcastRepository.find();
  }

  async retrieve(podcastId: string): Promise<Podcast> {
    return await this.podcastRepository.findOne({ where: { id: podcastId } });
  }

  async update(podcastId: string, data: Partial<Podcast>): Promise<Podcast> {
    return await this.manager.transaction(async (transactionManager) => {
      const podcastRepo = transactionManager.withRepository(this.podcastRepository);
      await podcastRepo.update(podcastId, data);
      return await podcastRepo.findOne({ where: { id: podcastId } });
    });
  }

  async delete(podcastId: string): Promise<void> {
    return await this.manager.transaction(async (transactionManager) => {
      const podcastRepo = transactionManager.withRepository(this.podcastRepository);
      await podcastRepo.delete(podcastId);
    });
  }

}

export default PodcastService;
