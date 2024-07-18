import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Podcast } from "../../../types/podcast";
import {
  editPodcastService,
  getPodcastByIdService,
} from "../../../utils/podcastService";
import { Spinner } from "@medusajs/icons";
import { EditPodcast } from "../components/EditPodcast";

const PodcastPage = ({ notify }: any) => {
  const { id } = useParams();
  const [podcastData, setPodcastData] = useState<Podcast>({
    id: "",
    title: "",
    description: "",
    image_url: "",
    audio_file: "",
    subtitle: "",
    created_at: new Date(),
    updated_at: new Date(),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const handleGetPodcast = async () => {
    const response = await getPodcastByIdService(id);
    if (response?.success) {
      setPodcastData(response.podcast);
    }
  };
  console.log("podcastData", podcastData);
  React.useEffect(() => {
    handleGetPodcast();
  }, [id]);

  const handleUpdatePodcast = async (podcastId: string, data: Podcast) => {
    setIsEditing(true);
    const response = await editPodcastService(podcastId, data);

    if (response?.success) {
      setPodcastData(response.podcast);
      setModalOpen(false);
      notify.success("Podcast", "Podcast updated successfully");
    } else {
      notify.error("Podcast", "Podcast update failed");
    }
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        {podcastData ? (
          <div className="w-full ">
            <div className="flex justify-between items-center ">
              <h1 className="text-[2.25rem] font-semibold text-gray-800 ">
                Podcast Details:-
              </h1>
              <div className="mt-4 ">
                <EditPodcast
                  open={modalOpen}
                  setOpen={setModalOpen}
                  handleUpdatePodcast={handleUpdatePodcast}
                  data={podcastData}
                  isEditing={isEditing}
                />
              </div>
            </div>

            <section className="mt-[20px] overflow-y-scroll mb-[100px] ">
              <div>
                <h3 className="text-[1.2rem] font-semibold mt-4 ">Title</h3>
                <p>{podcastData.title}</p>
              </div>
              <div>
                <h3 className="text-[1.2rem] font-semibold mt-4 ">Subtitle</h3>
                <p>{podcastData.subtitle}</p>
              </div>
              <div>
                <h3 className="text-[1.2rem] font-semibold mt-4 ">
                  Description
                </h3>
                <p>{podcastData.description}</p>
              </div>
              <div>
                <h3 className="text-[1.2rem] font-semibold mt-4 ">Audio</h3>
                {podcastData.audio_file && (
                  <audio controls>
                    <source src={podcastData?.audio_file} />
                  </audio>
                )}
              </div>
              <div>
                <h3 className="text-[1.2rem] font-semibold mt-4 ">Thumbnail</h3>
                <img
                  src={podcastData?.image_url}
                  alt="podcast image"
                  className="w-[200px] h-[200px] object-cover"
                />
              </div>
            </section>
          </div>
        ) : (
          <p>
            <Spinner className="animate-spin" />
          </p>
        )}
      </div>
    </div>
  );
};

export default PodcastPage;
