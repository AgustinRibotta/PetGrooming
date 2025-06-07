import { NavLink } from "react-router-dom";
import { PawPrint } from "lucide-react";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/owners", label: "Dueños" },
  { to: "/pets", label: "Mascotas" },
];

export default function Navbar() {

  const baseLinkClass = "rounded-md px-3 py-2 text-base font-medium transition-colors duration-150";
  const activeClass = "bg-gray-900 text-white";
  const inactiveClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <PawPrint className="h-8 w-8 text-teal-400" />
              <span className="ml-2 text-white font-semibold text-xl select-none">Peluquería Canina</span>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
                  }
                  end
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

        </div>
      </div>

    </nav>
  );
}
