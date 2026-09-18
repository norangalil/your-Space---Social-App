import React, { useState } from "react";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";
import Sidebar from "../sidebar/Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md md:hidden"
      >
        <Menu size={22} />
      </button>

      <main className="ml-0 mt-0 px-3 pt-16 md:ml-72 md:mt-10 md:px-6 md:pt-0">
        <Outlet />
      </main>
    </>
  );
}