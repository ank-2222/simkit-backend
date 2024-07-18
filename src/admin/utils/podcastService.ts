import { createPodcast, deletePodcast, getAllPodcast, getPodcastById, updatePodcast, uploadFile } from "../API/Api";
import axios from "axios";

export const getAllPodcastService = async () => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(getAllPodcast, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getPodcastByIdService = async (id:string) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(getPodcastById(id), options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPodcastService = async (data) => {
  try {
    const options = {
      headers: {
        "Content-Type":  "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.post(createPodcast, data, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deletePodcastService = async (id:string) => {
  try {
    const options = {
      headers: {
        "Content-Type":  "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.delete(deletePodcast(id), options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const editPodcastService = async (id:string,data:any) => {
  try {
    const options = {
      headers: {
        "Content-Type":  "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.put(updatePodcast(id), data, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const uploadFileService = async (data:any) => {
  try {
    const options = {
      headers: {
        "Content-Type":  "multipart/form-data",
      },
      withCredentials: true,
    };
    const response = await axios.post(uploadFile,data, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }

}