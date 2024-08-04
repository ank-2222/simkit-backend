import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ContactService from "../../../services/contact";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const contactService: ContactService = await req.scope.resolve(
      "contactService"
    );
   
    const id = `contact_${uuidv4()}`;
    const data = {
      id,
      ...(req.body as object),
    };
    const contact = await contactService.createContact(data);
    res.status(201).json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
