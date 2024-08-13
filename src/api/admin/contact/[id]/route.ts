import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ContactService from "../../../../services/contact";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const contactId = req.params.id;
    const contactService: ContactService = await req.scope.resolve(
      "contactService"
    );
    const contact = await contactService.retrieve(contactId);
    res.status(200).json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
