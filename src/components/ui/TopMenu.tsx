"use client";

import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

import { useUIStore } from "@/store";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);

  return (
    <nav className="fixed top-0 z-10 flex items-center justify-between w-full px-5">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Ice and Fire App</span>
        </Link>
      </div>

      <div className="flex items-center">
        <button onClick={openSideMenu} className="p-2 m-2 transition-all rounded-md hover:bg-gray-100">
          Menu
        </button>
      </div>
    </nav>
  );
};
