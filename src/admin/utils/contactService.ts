import axios from "axios";
import { getAllContactApi } from "../API/Api";

export const getAllContactService = async (limit:number=10,offset:number=0,type:string) => {
    try {
      const options = {
        headers: {
          "Content-Type":  "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(getAllContactApi(limit,offset,type), options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  
  }
  