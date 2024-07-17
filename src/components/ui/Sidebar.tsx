"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  IoApps,
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoOptionsOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-30" />}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fixed top-0 left-0 z-10 w-screen h-screen fade-in backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline size={30} className="absolute cursor-pointer top-5 right-5" onClick={() => closeSideMenu()} />

        {/* Menú */}

        <Link
          onClick={closeSideMenu}
          href="/server-page?page=1"
          className="flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100"
        >
          <IoApps size={20} />
          <span className="ml-3 text-md">House Page Server</span>
        </Link>

        <Link
          onClick={closeSideMenu}
          href="/client-page?page=1"
          className="flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100"
        >
          <IoApps size={20} />
          <span className="ml-3 text-md">House Page Client</span>
        </Link>
      </nav>
    </div>
  );
};
