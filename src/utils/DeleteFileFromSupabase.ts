import { supabase } from "./supabaseConfig";

export const deleteFileFromSupabase=async(path:string)=>{
    try {
        const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).remove([path]);
      } catch (error) {
        console.error("Error deleting file from Supabase:", error);
      }
}