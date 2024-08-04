import { EntityManager, Repository } from "typeorm";
import { Contact } from "../models/contact";
import { MedusaError } from "medusa-core-utils";

class ContactService {
  private manager: EntityManager;
  private contactRepository: Repository<Contact>;

  constructor({ manager, contactRepository }) {
    this.manager = manager;
    this.contactRepository = contactRepository;
  }

  async createContact(data: Partial<Contact>): Promise<Contact> {
    const contact = this.contactRepository.create(data);
    return await this.contactRepository.save(contact);
  }

  async listContacts(limit: number, offset: number): Promise<[Contact[], number]> {
    return await this.contactRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  }
}

export default ContactService;
