import { supabase } from "./supabaseConfig";

export async function uploadFileToSupabase(file:any, path: string): Promise<string | null> {
  try {
    const fileType = file?.mimetype; // Use mimetype from the formidable file object
    const arrayBuffer = await file?.filepath; // Use filepath directly for reading

    // Read the file as ArrayBuffer using fs
    const fs = require('fs');
    const buffer = fs.readFileSync(arrayBuffer); // Read the file into a buffer

    // Upload the file to Supabase
    if(!buffer || !fileType) {
      console.error("Error reading file from disk");
      return null;
    }
    const { data, error } = await supabase
      .storage
      .from(process.env.SUPABASE_BUCKET_NAME)
      .upload(path, buffer, {
        contentType: fileType,
      });

    if (error) {
      console.error("Error uploading file to Supabase:", error);
      return null;
    }


    // Construct the public URL
    const urlData = supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME)
      .getPublicUrl(path);
    return urlData.data?.publicUrl || null;
  } catch (error) {
    console.error("Error uploading file to Supabase:", error);
    return null;
  }
}
