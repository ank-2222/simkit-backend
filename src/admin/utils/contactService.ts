import axios from "axios";
import { getAllContactApi } from "../API/Api";

export const getAllContactService = async () => {
    try {
      const options = {
        headers: {
          "Content-Type":  "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(getAllContactApi, options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  
  }
  