import { Table } from "@medusajs/ui";
import { useMemo, useState, useEffect } from "react";
import { Tooltip } from "@medusajs/ui";
import { useNavigate } from "react-router-dom";
import { Contact } from "../../../types/contact";
import { InformationCircle } from "@medusajs/icons";

interface contactProps {
  Contacts: Contact[];
  contactType: string;
  nextBatch: (limit: number,offset: number,type:string) => Promise<Contact[]>;
}

function ContactListTable({ Contacts, contactType, nextBatch }: contactProps) {
  const [data, setData] = useState<Contact[]>(Contacts);
  const [offset, setOffset] = useState(0);
  const pageSize = 10;

 

  const canNextPage = useMemo(
    () => data.length === pageSize,
    [data.length, pageSize]
  );
  const canPreviousPage = useMemo(() => offset > 0, [offset]);

  const fetchNextPage = async (newOffset: number, limit: number) => {
    const newContacts = await nextBatch(limit,newOffset,contactType);
    setData(newContacts);
  };

  const nextPage = () => {
    if (canNextPage) {
      const newOffset = offset + pageSize;
      setOffset(newOffset);
      fetchNextPage(newOffset, pageSize);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      const newOffset = Math.max(0, offset - pageSize);
      setOffset(newOffset);
      fetchNextPage(newOffset, pageSize);
    }
  };

  const currentOrders = useMemo(() => {
    return data;
  }, [data]);

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex gap-1 flex-col w-full">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="pl-4">#</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              {contactType === "contact" && <Table.HeaderCell>Phone</Table.HeaderCell>}
              <Table.HeaderCell>Email</Table.HeaderCell>
              {contactType === "contact" && <Table.HeaderCell>Message</Table.HeaderCell>}
            </Table.Row>
          </Table.Header>
          <Table.Body className="w-full">
            {!currentOrders.length && (
              <Table.Row>
                <Table.Cell aria-colspan={5} className="text-center col-span-5">
                  No contacts available
                </Table.Cell>
              </Table.Row>
            )}
            {currentOrders.map((contact, index) => (
         <Table.Row
         key={contact.id}
         className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
         onClick={() => navigate(`/a/contact/${contact.id}`)}
       >
       
                <Table.Cell className="pl-4">{offset + index + 1}</Table.Cell>
                <Table.Cell>{contact.name}</Table.Cell>
                {contactType === "contact" && <Table.Cell>{contact.phone}</Table.Cell>}
                <Table.Cell>{contact.email}</Table.Cell>
                {contactType === "contact" && (
                  <Table.Cell>
                    <Tooltip content={contact.message}>
                      <InformationCircle />
                    </Tooltip>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Table.Pagination
          count={data.length}
          pageSize={pageSize}
          pageIndex={offset / pageSize}
          pageCount={Math.ceil(data.length / pageSize)}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
}

export default ContactListTable;
