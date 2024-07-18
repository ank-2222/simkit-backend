import React, { useState } from "react";
import { Podcast } from "../../../types/podcast";
import { editPodcastService } from "../../../utils/podcastService";
import {
    Button,
    FocusModal,
    Heading,
    Input,
    Label,
    Textarea,
    Text,
  } from "@medusajs/ui";
  import { PencilSquare, PlusMini, Spinner } from "@medusajs/icons";
interface EditPodcastProps {
  podcast: Podcast;
}

export function EditPodcast ({ podcast }:EditPodcastProps)  {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(podcast);
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (audioFile) {
      formData.append("audio", audioFile);
    }

    const response = await editPodcastService(podcast.id, formData);
    if (response?.success) {
      alert("Podcast updated successfully");
    } else {
      alert("Failed to update podcast");
    }
    setIsLoading(false);
  };

  return (
    <FocusModal>
    <FocusModal.Trigger asChild>
        <div className="flex justify-center items-center gap-x-2 text-base">

      <PencilSquare className="text-ui-fg-subtle" />
      Edit
        </div>
    </FocusModal.Trigger>
    <FocusModal.Content className="w-full">
      <FocusModal.Header></FocusModal.Header>
      <FocusModal.Body className="flex flex-col items-center py-16">
      <div>
      <h1>Edit Podcast</h1>
      {podcast ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setImageFile)}
              />
            </label>
          </div>
          <div>
            <label>
              Audio:
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange(e, setAudioFile)}
              />
            </label>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner className="mr-2 w-full " /> : <p>Save</p>}
          </button>
        </form>
      ) : (
        <p>Loading podcast details...</p>
      )}
    </div>
      </FocusModal.Body>
    </FocusModal.Content>
  </FocusModal>
   
  );
};

