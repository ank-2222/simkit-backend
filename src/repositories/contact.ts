import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Contact } from "../models/contact";

const ContactRepository = dataSource.getRepository(Contact);

export default ContactRepository;
