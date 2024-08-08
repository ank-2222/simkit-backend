import { RouteConfig } from "@medusajs/admin";
import { RouteProps } from "@medusajs/admin";
import { ListBullet } from "@medusajs/icons";
import { Contact } from "../../types/contact";
import React from "react";
import { getAllContactService } from "../../utils/contactService";
import ContactListTable from "./components/ContactListTable";

const ContactPage = ({ notify }: RouteProps) => {
  const [podcastContact, setPodcastContact] = React.useState<Contact[]>([]);
  const [userContact, setUserContact] = React.useState<Contact[]>([]);
  React.useEffect(() => {
    getAllContactService().then((data) => {
      console.log("data", data);
      if (data?.success) {
        setPodcastContact(filterPodcastContact("podcast", data.contacts));
        setUserContact(filterUserContact("contact", data.contacts));
      }
    });
  }, []);

  const filterPodcastContact = (type: string, data) => {
    return data.filter((contact: Contact) => contact.type === type);
  };
  const filterUserContact = (type: string, data) => {
    return data.filter((contact: Contact) => contact.type === type);
  };

  return (
    <div>
      <h1 className="text-[1.3rem] font-semibold leading-[125%] tracking-tighter my-4 ">
        {" "}
        Podcast Subscriber
      </h1>
      <section className="px-2 my-10">
        <ContactListTable Contacts={podcastContact} contactType="Podcast" />
      </section>

      <h1 className="text-[1.3rem] font-semibold leading-[125%] tracking-tighter my-4 ">
        Contact details
      </h1>
      <section className="px-2 my-10">
        <ContactListTable Contacts={userContact} contactType="contact" />
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
