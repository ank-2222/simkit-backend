import { Table } from "@medusajs/ui";
import { useMemo, useState } from "react";
import { Podcast } from "../../../types/podcast";
import { EllipsisHorizontal, PencilSquare, Tools, Trash } from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";
import { useNavigate } from "react-router-dom";
interface podcastProps {
  podcasts: Podcast[];
  handleDeletePodcast: (id: string) => void;
}

function PodcastListTable({ podcasts, handleDeletePodcast }: podcastProps) {
  const data = useMemo(() => podcasts, [podcasts]);
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
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Uploaded on</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="w-full">
            {!currentOrders.length && (
              <Table.Row>
                <Table.Cell aria-colspan={5} className="text-center col-span-5">
                  No podcasts available
                </Table.Cell>
              </Table.Row>
            )}
            {currentOrders.map((podcast, index) => {
              return (
                <Table.Row
                  key={podcast.id}
                  className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap "
                >
                  <Table.Cell className="pl-4">{index + 1}</Table.Cell>
                  <Table.Cell>{podcast.title}</Table.Cell>
                  <Table.Cell>{podcast.author}</Table.Cell>
                  <Table.Cell>
                    {new Date(podcast.created_at).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <DropdownMenu>
                      <DropdownMenu.Trigger asChild>
                        <IconButton>
                          <EllipsisHorizontal />
                        </IconButton>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <DropdownMenu.Item className="gap-x-2" onClick={()=>{
                          navigate(`/a/podcast/${podcast.id}`)
                        }} >
                          < Tools className="text-ui-fg-subtle" />
                          Details
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                          className="gap-x-2"
                          onClick={() => handleDeletePodcast(podcast?.id)}
                        >
                          <Trash className="text-ui-fg-subtle" />
                          Delete
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </Table.Cell>
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

export default PodcastListTable;
