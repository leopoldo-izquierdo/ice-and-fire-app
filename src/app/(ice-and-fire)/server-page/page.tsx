export const revalidate = 1; // 60 segundos

import { Pagination, Title } from "@/components";
import House from "@/components/ui/House";

async function fetchHouses(page: number, pageSize: number): Promise<any[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/house?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function HousesPageServer({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const totalItems = 444;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const data = await fetchHouses(page, itemsPerPage);

  return (
    <div className="relative flex flex-col">
      <div className="fixed top-0 left-[50%] right-[50%] shadow-md z-10">
        <Pagination totalPages={totalPages} currentPage={page} />
      </div>

      <div className="mt-10">
        <div>
          {data.map((elem) => (
            <House key={elem.url} data={elem} />
          ))}
          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
      </div>
    </div>
  );
}
