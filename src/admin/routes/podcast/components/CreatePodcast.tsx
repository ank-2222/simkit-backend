import { Button, FocusModal, Input, Label, Textarea, Text } from "@medusajs/ui";
import { PlusMini, Spinner } from "@medusajs/icons";
import React from "react";
import { uploadFileService } from "../../../utils/podcastService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
  Autosave,
  Strikethrough,
  Subscript,
  Superscript,
  Autoformat,
  CodeBlock,
  SourceEditing,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

interface CreatePodcastProps {
  handleAddPodcast: (podcast: any) => void;
  isCreatingPodcast: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreatePodcast({
  handleAddPodcast,
  isCreatingPodcast,
  isOpen,
  setIsOpen,
}: CreatePodcastProps) {
  const [podcastData, setPodcastData] = React.useState({
    title: "",
    subtitle: "",
    author: "",
    article: `<h1>Start Editing...</h1>`,
    audio_file: "",
    image_url: "",
    description: "",
  });
  console.log("podcastData", podcastData);
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [isAudioFileUploading, setIsAudioFileUploading] = React.useState(false);
  const [isImageFileUploading, setIsImageFileUploading] = React.useState(false);

  const handleChange = (
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

  const article_data = localStorage.getItem("article_data");
  React.useEffect(() => {
    if (article_data !== "" && article_data !== null) {
      console.log("article_data from local");
      setPodcastData((prevState) => ({
        ...prevState,
        article: article_data,
      }));
    }
  }, []);

  const handleUploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: String
  ) => {
    try {
      const files = e.target.files as HTMLInputElement["files"];
      if (files && files[0] && type === "audio") {
        setIsAudioFileUploading(true);
        setAudioFile(files[0]);
        const response = await uploadFileService({
          file: files[0],
          type: "audio",
        });
        setPodcastData((prevState) => ({
          ...prevState,
          audio_file: response?.fileUrl,
        }));
        setIsAudioFileUploading(false);
      } else if (files && files[0] && type === "image") {
        setIsImageFileUploading(true);
        setImageFile(files[0]);
        const response = await uploadFileService({
          file: files[0],
          type: "image",
        });
        setPodcastData((prevState) => ({
          ...prevState,
          image_url: response?.fileUrl,
        }));
        setIsImageFileUploading(false);
      }
    } catch (error) {
      console.error("Error uploading file", error);
      setIsImageFileUploading(false);
      setIsAudioFileUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !podcastData.audio_file ||
      !podcastData.image_url ||
      !podcastData.title ||
      !podcastData.description ||
      !podcastData.author ||
      !podcastData.article
    ) {
      alert("Please fill all the required fields");
      return;
    }
    handleAddPodcast(podcastData);
    localStorage.removeItem("article_data");
    setPodcastData({
      title: "",
      subtitle: "",
      author: "",
      article: ``,
      audio_file: "",
      image_url: "",
      description: "",
    });
  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setPodcastData((prevState) => ({  
      ...prevState,
      article: data,
      }));
    localStorage.setItem('article_data', data);
  };

  return (
    <FocusModal open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <FocusModal.Trigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          Add Podcast
          <PlusMini />
        </Button>
      </FocusModal.Trigger>
      <FocusModal.Content className="w-full max-h-[100vh] border-2 overflow-y-scroll">
        <FocusModal.Header></FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-8 max-w-[800px] m-auto">
          <div className="w-full">
            <p className="font-bold ">Create Podcast</p>
            <Text className="mt-4">
              Fill in the details to create a podcast
            </Text>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex w-full flex-col gap-4 mt-4">
                <div className="flex flex-col justify-center items-center w-full  flex-wrap gap-x-4">
                  <div className="flex w-full flex-1 flex-col gap-2">
                    <Label>Title</Label>
                    <Input
                      name="title"
                      placeholder="Enter title"
                      value={podcastData.title}
                      onChange={handleChange}
                      required
                      className="h-[40px] w-full "
                    />
                  </div>
                  <div className="flex w-full  flex-1 flex-col gap-2">
                    <Label>Subtitle(optional)</Label>
                    <Input
                      name="subtitle"
                      placeholder="Enter subtitle"
                      value={podcastData.subtitle}
                      onChange={handleChange}
                      className="h-[40px] w-full "
                    />
                  </div>
                  <div className="flex w-full  flex-1 flex-col gap-2">
                    <Label>Author</Label>
                    <Input
                      name="author"
                      placeholder="Enter Author Name"
                      value={podcastData.author}
                      onChange={handleChange}
                      className="h-[40px] w-full "
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col items-center">
                  <div className="flex flex-1 flex-col gap-2 w-full">
                    <Label>
                      Audio (mp3, wav, ogg, aac, m4a, Mp4 format only){" "}
                    </Label>
                    <div className="flex flex-1 w-full  items-center gap-x-4 relative">
                      <Input
                        name="audio"
                        placeholder="Upload audio"
                        type="file"
                        onChange={(e) => handleUploadFile(e, "audio")}
                        required
                        accept="audio/mp3, audio/wav, audio/ogg, audio/aac, audio/x-m4a, audio/m4a, audio/mp4"
                        className="w-full h-[40px]"
                      />
                      {isAudioFileUploading && (
                        <Spinner className="mr-2 animate-spin absolute right-[-50px] " />
                      )}
                    </div>
                    {podcastData.audio_file && !isAudioFileUploading && (
                      <audio controls>
                        <source src={podcastData?.audio_file} />
                      </audio>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 w-full">
                    <Label>Image (png/jpeg/jpg format only)</Label>
                    <div className="flex flex-1 w-full  items-center gap-x-4 relative">
                      <Input
                        name="image"
                        placeholder="Upload image"
                        type="file"
                        onChange={(e) => handleUploadFile(e, "image")}
                        required
                        accept="image/png, image/jpeg, image/jpg"
                        className="w-full h-[40px]"
                      />
                      {isImageFileUploading && (
                        <Spinner className="mr-2 animate-spin absolute right-[-50px]  " />
                      )}
                    </div>
                    {podcastData.image_url && !isImageFileUploading && (
                      <img
                        className="object-cover border-4 rounded-[0.3rem] w-[400px] h-[400px] object-center "
                        src={podcastData.image_url}
                      />
                    )}
                  </div>
                </div>
                {/* <img src={podcastData.image.name} alt="podcast image" /> */}
                <div className="w-full ">
                  <Label>Description</Label>
                  <Textarea
                    name="description"
                    value={podcastData.description}
                    onChange={(e) =>
                      setPodcastData((prevState) => ({
                        ...prevState,
                        description: e.target.value,
                      }))
                    }
                    className="w-full h-32 p-2"
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div className="z-[999] relative min-h-[200px]">
                  <CKEditor
                    data={podcastData.article}
                    editor={ClassicEditor}
                    onChange={handleEditorChange}
                    config={{
                     
                      toolbar: [
                        "undo",
                        "redo",
                        
                        "|",
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        'strikethrough', 'subscript', 'superscript', 
                        "|",
                        "link",
                        "insertTable",
                        // "mediaEmbed",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "indent",
                        "outdent",
                      ],
                    
                      plugins: [
                        Autosave,
                        Bold,
                        Essentials,
                        Heading,
                        Indent,
                        Autoformat,
                        IndentBlock,
                        Italic,
                        Link,
                        List,
                        // MediaEmbed,
                        Strikethrough,
                        Subscript,
                        Superscript,
                        Paragraph,
                        Table,
                        Undo,

                      ],
                      autosave: {
                        save(editor) {
                          return new Promise((resolve, reject) => {
                            setTimeout(() => {
                              const data = editor.getData();
                              localStorage.setItem("article_data", data);
                            }, 2000);
                          });
                        },
                      },

                      // initialData: podcastData?.article,
                    }}
                  />
                </div>

                <Button type="submit" disabled={isCreatingPodcast}>
                  {isCreatingPodcast ? (
                    <Spinner className="mr-2" />
                  ) : (
                    <p>Add Podcast</p>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}
