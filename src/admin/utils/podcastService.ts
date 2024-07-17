import { createPodcast, getAllPodcast } from "../API/Api";
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

export const createPodcastService = async (data) => {
  try {
    const options = {
      headers: {
        "Content-Type":  "multipart/form-data",
      },
      withCredentials: true,
    };
    const response = await axios.post(createPodcast, data, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
