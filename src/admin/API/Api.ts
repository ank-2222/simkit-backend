

const API_VAR = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

export const getAllPodcast = `${API_VAR}/admin/podcast`;
export const getPodcastById =(id:string)=> `${API_VAR}/admin/podcast/${id}`;
export const createPodcast = `${API_VAR}/admin/podcast`;
export const updatePodcast =(id:string)=> `${API_VAR}/admin/podcast?id=${id}`;
export const deletePodcast =(id:string)=> `${API_VAR}/admin/podcast?id=${id}`;
export const uploadFile = `${API_VAR}/admin/podcast/uploadfile`;
export const getAllContactApi =(limit:number,offset:number,type:string)=> `${API_VAR}/admin/contact?limit=${limit}&offset=${offset}&type=${type}`;