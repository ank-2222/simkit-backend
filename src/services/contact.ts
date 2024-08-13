import { BaseService } from "medusa-interfaces";
import { EntityManager } from "typeorm";
import ContactRepository from "../repositories/contact";
import { Contact } from "../models/contact";
import { MedusaError } from "medusa-core-utils";

class ContactService extends BaseService {
  private manager: EntityManager;
  private contactRepository: any;

  constructor({ manager }) {
    super();
    this.manager = manager;
    this.contactRepository = ContactRepository;
  }

  async create(data: Partial<Contact>): Promise<Contact> {
    return await this.manager.transaction(async (transactionManager) => {
      const contactRepo = transactionManager.withRepository(
        this.contactRepository
      );
      const contact = contactRepo.create(data);
      return await contactRepo.save(contact);
    });
  }

  async list(limit: number, offset: number, type:string): Promise<[Contact[], number]> {
    return await this.contactRepository.findAndCount({
      skip: offset,
      take: limit,
      where: { type }
    });
  }

  async retrieve(contactId: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id: contactId } });
    if (!contact) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, "Contact not found");
    }
    return contact;
  }

  

  async delete(contactId: string): Promise<void> {
    return await this.manager.transaction(async (transactionManager) => {
      const contactRepo = transactionManager.withRepository(
        this.contactRepository
      );

      const contact = await contactRepo.findOne({ where: { id: contactId } });
      if (!contact) {
        throw new MedusaError(MedusaError.Types.NOT_FOUND, "Contact not found");
      }

      await contactRepo.delete(contactId);
    });
  }
}

export default ContactService;
