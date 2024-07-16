import { supabase } from "./supabaseConfig";

export async function uploadFileToSupabase(
  file: File,
  path: string
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .upload(path, file);

  if (error) {
    console.error("Error uploading file to Supabase:", error);
    return null;
  }

  // Construct the public URL
  const urlData  = supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .getPublicUrl(path);
  return urlData.data?.publicUrl || null;
}
