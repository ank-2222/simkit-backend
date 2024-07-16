import { Button, FocusModal, Heading, Input, Label,Textarea, Text } from "@medusajs/ui";
import { PlusMini } from "@medusajs/icons";
import React from "react";

interface createPodcastProps{
    handleAddPodcast: (podcast: any) => void
    
}

export function CreatePodcast({handleAddPodcast}:createPodcastProps) {
  const [podcastData, setPodcastData] = React.useState({
    title: "",
    subtitle: "",
    audio: null as File | null,
    image: null as File | null,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(podcastData);
    handleAddPodcast(podcastData);
  };

  return (
    <FocusModal>
      <FocusModal.Trigger asChild>
        <Button>
          Add Podcast
          <PlusMini />
        </Button>
      </FocusModal.Trigger>
      <FocusModal.Content>
        <FocusModal.Header></FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-16">
          <div>
            <Heading>Create Podcast</Heading>
            <Text className="mt-4">
              Fill in the details to create a podcast
            </Text>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <Label>Title</Label>
                  <Input
                  name="title"
                    placeholder="Enter title"
                    value={podcastData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Subtitle</Label>
                  <Input
                  name="subtitle"
                    placeholder="Enter subtitle"
                    value={podcastData.subtitle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Audio</Label>
                  <Input
                  name="audio"
                    placeholder="Upload audio"
                    type="file"
                    onChange={handleChange}
                    required
                    accept="audio/*"
                  />
                </div>
                <div>
                  <Label>Image</Label>
                  <Input
                  name="image"
                    placeholder="Upload image"
                    type="file"
                    onChange={handleChange}
                    required
                    accept="image/*"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                  name="description"
                    value={podcastData.description}
                    onChange={(e)=>setPodcastData((prevState) => ({ ...prevState, description: e.target.value }))}
                    className="w-full h-32 p-2"
                    placeholder="Enter description"
                  />
                </div>
                <Button type="submit">Create Podcast</Button>
              </div>
            </form>
          </div>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}
