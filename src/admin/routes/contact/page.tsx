import { RouteConfig } from "@medusajs/admin";
import { RouteProps } from "@medusajs/admin";
import { InformationCircle, ListBullet } from "@medusajs/icons";
import { Contact } from "../../types/contact";
import React from "react";
import { getAllContactService } from "../../utils/contactService";
import ContactListTable from "./components/ContactListTable";

const ContactPage = ({ notify }: RouteProps) => {
  const [podcastContact, setPodcastContact] = React.useState<Contact[]>([]);
  const [userContact, setUserContact] = React.useState<Contact[]>([]);
  React.useEffect(() => {
    getAllContactService(10,0,"contact").then((data) => {
      if (data?.success) {
        setUserContact(filterUserContact("contact", data.contacts));
      }
    });
  }, []);
  React.useEffect(() => {
    getAllContactService(10,0,"podcast").then((data) => {
      if (data?.success) {
        setPodcastContact(filterPodcastContact("podcast", data.contacts));
      }
    });
  }, []);

  const filterPodcastContact = (type: string, data) => {
    return data.filter((contact: Contact) => contact.type === type);
  };
  const filterUserContact = (type: string, data) => {
    return data.filter((contact: Contact) => contact.type === type);
  };


  const nextBatch = async (limit: number, offset: number,type:string) => {
    const response = await getAllContactService(limit,offset,type);
    return response.contacts;
  }

  return (
    <div>
      <h1 className="text-[1.3rem] font-semibold leading-[125%] tracking-tighter my-4 ">
        {" "}
        Podcast Subscriber
      </h1>
      <section className="px-2 my-10">
        {
          podcastContact.length !== 0 ? (
            <ContactListTable Contacts={podcastContact} contactType="podcast" 
        nextBatch={nextBatch}
        />
          ) : (
            <div className="flex items-center justify-center">
              <InformationCircle className="w-6 h-6 text-gray-400" />
              <p className="text-gray-400">No contacts found</p>
            </div>
          )
}
     
      </section>

      <h1 className="text-[1.3rem] font-semibold leading-[125%] tracking-tighter my-4 ">
        Contact details
      </h1>
      <section className="px-2 my-10">
      {
          userContact.length !== 0 ? (
            <ContactListTable Contacts={userContact} contactType="contact"
        nextBatch={nextBatch}
        />
          ) : (
            <div className="flex items-center justify-center">
              <InformationCircle className="w-6 h-6 text-gray-400" />
              <p className="text-gray-400">No contacts found</p>
            </div>
          )
}
       
      </section>
    </div>
  );
};
export const config: RouteConfig = {
  link: {
    label: "Contact",
    icon: ListBullet,
  },
};
export default ContactPage;
