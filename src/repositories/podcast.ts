import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Podcast } from "../models/podcast";

const PodcastRepository = dataSource.getRepository(Podcast);

export default PodcastRepository;
