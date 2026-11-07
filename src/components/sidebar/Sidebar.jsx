import React, { useContext } from "react";
import { NavLink } from "react-router";
import {
  House,
  CircleUserRound,
  Settings,
  LogOut,
  Zap,
  X,
  FaceGrinning,
} from "lucide-react";
import { userContext } from "../../pages/context/user.context";

export default function Sidebar({ isOpen, onClose }) {
  const { userInfo } = useContext(userContext);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 p-3
          transition-transform duration-300
          md:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="h-full rounded-3xl bg-linear-to-r from-amber-200 via-amber-300 to-amber-500 px-4 py-5 text-gray-600 shadow-xl flex flex-col">

          <button
            onClick={onClose}
            className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 md:hidden"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <FaceGrinning
                  size={22}
                className=" text-amber-600" />
      
            </div>

            <div>
              <h1 className="text-lg font-bold leading-5 text-white">
                Your Space
              </h1>

              <p className="text-xs text-gray-500">
                social network
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 px-3 text-xs font-semibold tracking-widest text-gray-500">
              MENU
            </p>

            <ul className="space-y-2">

              <li>
                <NavLink
                  to="/"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-yellow-100 text-gray-700"
                        : "hover:bg-yellow-100 hover:text-gray-700"
                    }`
                  }
                >
                  <House size={20} />
                  <span>Home</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/profile"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-yellow-100 text-gray-700"
                        : "hover:bg-yellow-100 hover:text-gray-700"
                    }`
                  }
                >
                  <CircleUserRound size={20} />
                  <span>Profile</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/settings"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-yellow-100 text-gray-700"
                        : "hover:bg-yellow-100 hover:text-gray-700"
                    }`
                  }
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </NavLink>
              </li>

            </ul>
          </div>

          <div className="mt-auto">

            <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-3">

              <div className="flex items-center gap-3">

                <div className="relative">
                  <img
                    src={userInfo?.photo || "./assets/images/hero.png"}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#181d25] bg-green-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">
                    {userInfo?.name }
                  </p>

                  <p className="text-xs text-gray-500">
                    @{userInfo?.username}
                  </p>
                </div>

              </div>

              <NavLink
                to="/login"
                onClick={onClose}
              >
                <LogOut
                  size={20}
                  className="text-gray-400 transition hover:text-gray-700"
                />
              </NavLink>

            </div>

          </div>

        </div>
      </aside>
    </>
  );
}