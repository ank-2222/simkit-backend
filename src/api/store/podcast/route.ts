import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import podcastService from "../../../services/podcast";
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const getPodcast: podcastService = await req.scope.resolve(
      "podcastService"
    );
    const podcasts = await getPodcast.list();
    res.status(200).json({ success: true,podcasts });
  } catch (error) {
    res.status(500).json({ success: false,error: error.message });
  }
}
