import { Table } from "@medusajs/ui";
import { useMemo, useState } from "react";
import { Tooltip } from "@medusajs/ui";

import { useNavigate } from "react-router-dom";
import { Contact } from "../../../types/contact";
import { InformationCircle } from "@medusajs/icons";
interface contactProps {
  Contacts: Contact[];
  contactType: string;
}

function ContactListTable({ Contacts, contactType }: contactProps) {
  const data = useMemo(() => Contacts, [Contacts]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pageCount = Math.ceil(data.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentOrders = useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, data.length);

    return data.slice(offset, limit);
  }, [currentPage, pageSize, data]);

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex gap-1 flex-col w-full">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="pl-4">#</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              {
                contactType === "contact" && (
                  <Table.HeaderCell>Phone</Table.HeaderCell>
                )
              }
              <Table.HeaderCell>Email</Table.HeaderCell>
              {
                contactType === "contact" && (
                  <Table.HeaderCell>Message</Table.HeaderCell>
                )
              }
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
            {currentOrders.map((contact, index) => {
              return (
                <Table.Row
                  key={contact.id}
                  className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap "
                >
                  <Table.Cell className="pl-4">{index + 1}</Table.Cell>
                  <Table.Cell>{contact.name}</Table.Cell>
                  {contactType === "contact" && (
                    <Table.Cell>{contact.phone}</Table.Cell>
                  )}
                  <Table.Cell>{contact.email}</Table.Cell>
                  {contactType === "contact" && (
                    <Table.Cell>
                      <Tooltip content={contact.message}>
                        <InformationCircle />
                      </Tooltip>
                    </Table.Cell>
                  )}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <Table.Pagination
          count={data.length}
          pageSize={pageSize}
          pageIndex={currentPage}
          pageCount={data.length}
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
