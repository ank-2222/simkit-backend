import React, { useState } from "react";
import { RouteProps, useParams } from "react-router-dom";
import { Podcast } from "../../../types/podcast";
import {
  editPodcastService,
  getPodcastByIdService,
} from "../../../utils/podcastService";
import { Input, Label } from "@medusajs/ui";

const PodcastPage = () => {
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

  const handleGetPodcast = async () => {
    const response = await getPodcastByIdService(id);
    if (response?.success) {
      setPodcastData(response.podcast);
    }
  };
 console.log("podcastData",podcastData)
  React.useEffect(() => {
    handleGetPodcast();
  }, [id]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      // Handle file input
      setPodcastData((prevState) => ({
        ...prevState,
        [name]: files[0], // Store the File object in state
      }));
    } else {
      // Handle text input
      setPodcastData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", podcastData.title);
    formData.append("description", podcastData.description);
    if (podcastData.image_url) {
      formData.append("image", podcastData.image_url);
    }
    if (podcastData.audio_file) {
      formData.append("audio", podcastData.audio_file);
    }

    const response = await editPodcastService(podcastData.id, formData);
    console.log("res", response);
    // if (response?.success) {
    //     notify.success("Podcast", "Podcast updated successfully");
    // } else {
    //     notify.error("Podcast", "Some error occured, try again!");
    // }
  };
  return (
    <div>
      <div>
        {podcastData ? (
          <div className="w-full ">
            <h1 className="text-[2.25rem] font-semibold text-gray-800 ">
              Podcast Details:-
            </h1>
            <section className="mt-[50px] overflow-y-scroll">

            <div>
              <h3 className="text-[1.2rem] font-semibold mt-4 ">Title</h3>
              <Input
                name="title"
                value={podcastData.title}
                onChange={handleFileChange}
                readOnly={true}
                className="h-[40px] w-full my-1  "
              />
            </div>
            <div>
              <h3 className="text-[1.2rem] font-semibold mt-4 ">Subtitle</h3>
              <Input
                name="title"
                value={podcastData.subtitle}
                onChange={handleFileChange}
                readOnly={true}
                className="h-[40px] w-full my-1  "
              />
            </div>
            <div>
              <h3 className="text-[1.2rem] font-semibold mt-4 ">Description</h3>
              <Input
                name="title"
                value={podcastData.description}
                onChange={handleFileChange}
                readOnly={true}
                className="h-[40px] w-full my-1  "
              />
            </div>
            <div>
              <h3 className="text-[1.2rem] font-semibold mt-4 ">Audio</h3>
              <audio controls>
                <source src={podcastData?.audio_file} />
              </audio>
            </div>
            <div>
              <h3 className="text-[1.2rem] font-semibold mt-4 ">Thumbnail</h3>
             <img src={podcastData?.image_url} alt="podcast image" className="w-[200px] h-[200px] object-cover" />
            </div>
         
            

            </section>
          </div>
        ) : (
          <p>Loading podcast details...</p>
        )}
      </div>
    </div>
  );
};

export default PodcastPage;
