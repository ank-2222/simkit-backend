import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import podcastService from "../../../../services/podcast";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const podcastId = req.params.id;
    const getPodcast: podcastService = await req.scope.resolve(
      "podcastService"
    );
    const podcast = await getPodcast.retrieve(podcastId);
    res.status(200).json({ success: true, podcast });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
