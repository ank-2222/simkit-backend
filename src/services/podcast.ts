import { BaseService } from "medusa-interfaces";
import { EntityManager } from "typeorm";
import PodcastRepository from "../repositories/podcast";
import { Podcast } from "../models/podcast";
import { uploadFileToSupabase } from "../utils/uploadFileToSupabase";
import { MedusaError } from "medusa-core-utils";
class PodcastService extends BaseService {
  private manager: EntityManager;
  private podcastRepository: any;

  constructor({ manager }) {
    super();
    this.manager = manager;
    this.podcastRepository = PodcastRepository;
  }

  async create(data: Partial<Podcast>): Promise<Podcast> {
    return await this.manager.transaction(async (transactionManager) => {
      const podcastRepo = transactionManager.withRepository(
        this.podcastRepository
      );
      const podcast = podcastRepo.create(data);
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
      const podcastRepo = transactionManager.withRepository(
        this.podcastRepository
      );
      await podcastRepo.update(podcastId, data);
      return await podcastRepo.findOne({ where: { id: podcastId } });
    });
  }

  async delete(podcastId: string): Promise<void> {
    return await this.manager.transaction(async (transactionManager) => {
      const podcastRepo = transactionManager.withRepository(
        this.podcastRepository
      );
      await podcastRepo.delete(podcastId);
    });
  }

  async uploadFile(file: any, type: string): Promise<string> {
      let path = "";
      if (type[0] === "audio") path = `/podcast/audio/${file[0].newFilename}`;
      else if (type[0] === "image") path = `/podcast/image/${file[0].newFilename}`;
      else{
        throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Failed to set Path');
      }
      
      const fileUrl = await uploadFileToSupabase(file[0], path);
      if (!fileUrl) {
        throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Failed to upload file');
      }
      return fileUrl;


     
   
  }
}

export default PodcastService;
