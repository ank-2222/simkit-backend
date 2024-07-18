import { RouteConfig } from "@medusajs/admin";
import { RouteProps } from "@medusajs/admin";
import { SparklesSolid } from "@medusajs/icons";
import PodcastListTable from "./components/PodcastListTable";
import React from "react";
import {
  createPodcastService,
  deletePodcastService,
  getAllPodcastService,
} from "../../utils/podcastService";
import { Podcast } from "../../types/podcast";
import { CreatePodcast } from "./components/CreatePodcast";
const PodcastPage = ({ notify }: RouteProps) => {
  const [podcasts, setPodcasts] = React.useState<Podcast[]>([]);
  React.useEffect(() => {
    getAllPodcastService().then((data) => {
      if (data?.success) {
        setPodcasts(data.podcasts);
      }
    });
  }, []);

  const[ isCreatingPodcast, setIsCreatingPodcast] = React.useState(false);

  const handleAddPodcast = async (podcast: Podcast) => {

    setIsCreatingPodcast(true);
    const response = await createPodcastService(podcast);
    if (response?.success) {
      setIsCreatingPodcast(false);
      setPodcasts([...podcasts, response.podcast]);
      notify.success("Podcast", "Podcast Added successfully");
    }else{
      notify.error("Podcast", "Failed to add podcast");
    }
  };


  const handleDeletePodcast = async (id: string) => {
    const response = await deletePodcastService(id);
    if (response?.success) {
      setPodcasts(podcasts.filter((podcast) => podcast.id !== id));
      notify.success("Podcast", "Podcast deleted successfully");
    } else {
      notify.error("Podcast", "Failed to delete podcast");
    }
  }

  return (
    <div>
      <div className="flex justify-end items-center py-8 px-4 ">
        <CreatePodcast handleAddPodcast={handleAddPodcast} isCreatingPodcast={isCreatingPodcast}  />
      </div >

      <PodcastListTable podcasts={podcasts} handleDeletePodcast={handleDeletePodcast}  />
    </div>
  );
};
export const config: RouteConfig = {
  link: {
    label: "Podcast",
    icon: SparklesSolid,
  },
};
export default PodcastPage;
