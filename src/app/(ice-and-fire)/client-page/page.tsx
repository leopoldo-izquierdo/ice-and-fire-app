"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pagination, Title } from "@/components";
import House from "@/components/ui/House";
import ThreeBackground from "@/components/ui/ThreeBackground";

const fetchHouses = async (page: number, pageSize: number): Promise<any[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/house?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function HousesPageClient({ searchParams }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(searchParams.page ? parseInt(searchParams.page) : 1);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalItems = 444;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (page < 1 || isNaN(page)) {
      return;
    }

    const loadHouses = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetchHouses(page, itemsPerPage);
        setData(fetchedData);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    loadHouses();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && !isNaN(newPage) && newPage <= totalPages) {
      setPage(newPage);
      router.push(`/client-page?page=${newPage}`);
    }
  };

  return (
    <div className="relative flex flex-col">
      <ThreeBackground />

      <div className="fixed top-0 left-[50%] right-[50%] shadow-md z-10">
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
      </div>

      <div className="mt-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data.map((elem) => (
              <House key={elem.url} data={elem} />
            ))}
            <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
