import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import podcastService from "../../../services/podcast";
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const getPodcast: podcastService = await req.scope.resolve(
      "podcastService"
    );
    const podcasts = await getPodcast.list();
    res.status(200).json({success: true, podcasts });
  } catch (error) {
    res.status(500).json({
      success: false,
      
      error: error.message });
  }
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const form =  formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: 'Failed to parse form data',
      });
    }

    try {
      const id = `podcast_${uuidv4()}`;
      const data = {
        id,
        ...fields,
        image: files.image ? files.image[0] : null,
        audio: files.audio ? files.audio[0] : null,
      };

      // Validate that files are present
      if (!data.image || !data.audio) {
        return res.status(400).json({
          success: false,
          error: 'Image and audio files are required',
        });
      }

      const createPodcast: podcastService = await req.scope.resolve('podcastService');
      const podcast = await createPodcast.create(data);

      res.status(200).json({ success: true, podcast });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });
}


export async function PUT(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { id } = req.query; // Get id from query parameters
    const data = req.body;

    // Ensure id is a string
    if (typeof id !== 'string') {
      res.status(400).json({
        success: false,
        error: "Invalid podcast ID provided."
      });
      return;
    }
    const updatePodcast: podcastService = await req.scope.resolve(
      "podcastService"
    );
    console.log(id,data);
    const podcast = await updatePodcast.update(id, data);
    res.status(200).json({ 
      success: true,
      podcast });
  } catch (error) {
    res.status(500).json({
      success: false,
      
      error: error.message });
  }
}


export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { id } = req.query; // Get id from query parameters

    // Ensure id is a string
    if (typeof id !== 'string') {
      res.status(400).json({
        success: false,
        error: "Invalid podcast ID provided."
      });
      return;
    }
    const deletePodcast: podcastService = await req.scope.resolve(
      "podcastService"
    );
    console.log(id);
    await deletePodcast.delete(id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      
      error: error.message });
  }
}

