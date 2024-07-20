import {
    Button,
    FocusModal,
    Input,
    Label,
    Textarea,
    Text,
  } from "@medusajs/ui";
  import { PencilSquare, PlusMini, Spinner } from "@medusajs/icons";
  import React from "react";
  import { uploadFileService } from "../../../utils/podcastService";
import { Podcast } from "../../../types/podcast";

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
    open:boolean;
    handleUpdatePodcast: (podcastId:string,data: any) => void;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
 data: Podcast;
 isEditing:boolean;
  }
  
  export function EditPodcast({
    open,
    data,
    setOpen,
    isEditing,
    handleUpdatePodcast
  }: CreatePodcastProps) {
    const [podcastData, setPodcastData] = React.useState({
      title: data.title||"",
      subtitle: data.subtitle||"",
      author: data.author||"",
      article: data.article||"",
      audio_file:data.audio_file|| "",
      image_url: data.image_url||"",
      description:data.description|| "",
    });
    React.useEffect(() => {
      setPodcastData({
        title: data.title,
        subtitle: data.subtitle,
        audio_file:data.audio_file,
        author: data.author,
        article: data.article,
        image_url: data.image_url,
        description:data.description,
      });
    
     
    }, [data])
    
   console.log("podcastData",podcastData)
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
            audio_file: response.fileUrl,
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
            image_url: response.fileUrl,
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
  
      if(!podcastData.audio_file || !podcastData.image_url||!podcastData.title||!podcastData.description){
        alert("Please fill all the required fields");
        return;
      }

      handleUpdatePodcast(data.id,podcastData);
    
    };
    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setPodcastData((prevState) => ({  
        ...prevState,
        article: data,
        }));
    };
    return (
      <FocusModal
      open={open}
        onOpenChange={(isOpen) => {setOpen(isOpen)}}
>
        <FocusModal.Trigger >
          <Button className="flex justify-center items-center gap-x-2" onClick={()=>setOpen(true)}>
         <PencilSquare className="mr-2" />
            <p>Edit Podcast</p>
          </Button>
        </FocusModal.Trigger>
        <FocusModal.Content className="w-full max-h-[100vh] border-2 overflow-y-scroll">
          <FocusModal.Header>
            {/* <button onClick={()=>setOpen(false) } className="bg-red-600 px-2 py-1 mx-4 text-base font-bold  text-white rounded-[0.4rem] " >Close</button> */}
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col items-center py-8 max-w-[800px] m-auto">
            <div className="w-full">
              <p className="font-bold ">Edit Podcast</p>
              <Text className="mt-4">
                Fill in the details and Save.
              </Text>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex w-full flex-col gap-4 mt-4">
                  <div className="flex flex-col justify-center items-center w-full  flex-wrap gap-x-4 gap-y-4">
                    <div className="flex w-full flex-1 flex-col gap-2">
                      <Label>Title</Label>
                      <Input
                        name="title"
                        placeholder="Enter title"
                        value={podcastData.title}
                        onChange={handleChange}
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
                        placeholder="Enter Author"
                        value={podcastData.author}
                        onChange={handleChange}
                        className="h-[40px] w-full "
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <div className="flex flex-1 flex-col gap-2 w-full">
                      <Label>Audio</Label>
                      <div className="flex flex-1 w-full  items-center gap-x-4 relative">
  
                      <Input
                        name="audio"
                        placeholder="Upload audio"
                        type="file"
                        onChange={(e) => handleUploadFile(e, "audio")}
                        accept="audio/*"
                        className="w-full h-[40px]"
                      />
                      {isAudioFileUploading && <Spinner className="mr-2 animate-spin absolute right-[-50px] " />}
                      </div>
                      {podcastData.audio_file && !isAudioFileUploading && (
                        <audio controls>
                          <source src={podcastData?.audio_file} />
                        </audio>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 w-full">
                      <Label>Image</Label>
                      <div className="flex flex-1 w-full  items-center gap-x-4 relative">
  
                      <Input
                        name="image"
                        placeholder="Upload image"
                        type="file"
                        onChange={(e) => handleUploadFile(e, "image")}
                        accept="image/*"
                        className="w-full h-[40px]"
  
                      />
                      {isImageFileUploading && <Spinner className="mr-2 animate-spin absolute right-[-50px]  " />}
                      </div>
                      {podcastData.image_url&& !isImageFileUploading && (
                        <img className="object-cover border-4 rounded-[0.3rem] w-[400px] h-[400px] object-center " src={podcastData.image_url} />
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
                      

                    }}
                  />
                </div>
                  <Button type="submit"   >
                    {isEditing ? (
                      <Spinner className="mr-2 animate-spin" />
                    ) : (
                      <p>Save</p>
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
  