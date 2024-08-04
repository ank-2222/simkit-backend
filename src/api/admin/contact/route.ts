import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ContactService from "../../../services/contact";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const contactService: ContactService = await req.scope.resolve(
      "contactService"
    );
    const { limit = 10, offset = 0 } = req.query;

    const [contacts, count] = await contactService.listContacts(
      parseInt(limit as string),
      parseInt(offset as string)
    );

    res.status(200).json({ success: true, contacts, count, limit: parseInt(limit as string), offset: parseInt(offset as string) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}