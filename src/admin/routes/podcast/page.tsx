import { RouteConfig } from "@medusajs/admin";
import { RouteProps } from "@medusajs/admin";
import { SparklesSolid } from "@medusajs/icons";
import PodcastListTable from "./components/PodcastListTable";
import React from "react";
import {
  createPodcastService,
  getAllPodcastService,
} from "../../utils/podcastService";
import { Podcast } from "../../types/podcast";
import { CreatePodcast } from "./components/CreatePodcast";
const Podcast = ({ notify }: RouteProps) => {
  const [podcasts, setPodcasts] = React.useState<Podcast[]>([]);
  React.useEffect(() => {
    getAllPodcastService().then((data) => {
      if (data?.success) {
        setPodcasts(data.podcasts);
      }
    });
  }, []);

  const handleAddPodcast = async (podcast: Podcast) => {
    const response = await createPodcastService(podcast);
    if (response?.success) {
      setPodcasts([...podcasts, response.podcast]);
      notify.success("Podcast", "Podcast Added successfully");
    }else{
      notify.error("Podcast", "Failed to add podcast");
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center py-8 px-4 ">
        <CreatePodcast handleAddPodcast={handleAddPodcast} />
      </div>

      <PodcastListTable podcasts={podcasts} />
    </div>
  );
};
export const config: RouteConfig = {
  link: {
    label: "Podcast",
    icon: SparklesSolid,
  },
};
export default Podcast;
