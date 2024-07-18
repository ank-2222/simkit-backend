import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PodcastService from "../../../../services/podcast";
import formidable from "formidable";
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "Failed to parse form data",
      });
    }
    try {
        const { type }: any = fields;
        const { file }: any = files;
      if (!file) {
        res.status(400).json({
          success: false,
          error: "No file provided",
        });
        return;
      }
      if (!type) {
        res.status(400).json({
          success: false,
          error: "No type provided",
        });
        return;
      }
      const uploadFile: PodcastService = await req.scope.resolve(
        "podcastService"
      );
      const fileUrl = await uploadFile.uploadFile(file, type);

      res.status(200).json({ success: true, fileUrl });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });
}
