import { Table } from "@medusajs/ui"
import { useMemo, useState } from "react"
import { Podcast } from "../../../types/podcast";

interface podcastProps{
  podcasts:Podcast[]
}

function PodcastListTable({podcasts}:podcastProps) {

   const data = useMemo(() => podcasts, [podcasts]);
   const [currentPage, setCurrentPage] = useState(0)
   const pageSize = 3
   const pageCount = Math.ceil(data.length / pageSize)
   const canNextPage = useMemo(
     () => currentPage < pageCount - 1,
     [currentPage, pageCount]
   )
   const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage])
 
   const nextPage = () => {
     if (canNextPage) {
       setCurrentPage(currentPage + 1)
     }
   }
 
   const previousPage = () => {
     if (canPreviousPage) {
       setCurrentPage(currentPage - 1)
     }
   }
 
   const currentOrders = useMemo(() => {
     const offset = currentPage * pageSize
     const limit = Math.min(offset + pageSize, data.length)
 
     return data.slice(offset, limit)
   }, [currentPage, pageSize, data])
 
  return (

    <div>
<div className="flex gap-1 flex-col">
      <Table className="px-2">
        <Table.Header>
          <Table.Row className="px-2 ">
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>title</Table.HeaderCell>
            <Table.HeaderCell>subtitle</Table.HeaderCell>
            <Table.HeaderCell >Uploaded on</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="px-2">
          {currentOrders.map((podcast,index) => {
            return (
              <Table.Row
                key={podcast.id}
                className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
              >
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{podcast.title}</Table.Cell>
                <Table.Cell>{podcast.subtitle}</Table.Cell>
                <Table.Cell>{new Date(podcast.created_at).toLocaleString()}</Table.Cell>
               
              </Table.Row>
            )
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
  )
}

export default PodcastListTable;