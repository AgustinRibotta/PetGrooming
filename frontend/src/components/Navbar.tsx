import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto flex items-center h-16 px-4">
        {/* Logo a la izquierda */}
        <div className="flex-shrink-0">
          <img
            className="h-8 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Logo"
          />
        </div>

        {/* Links centrados con espacio */}
        <div className="flex-grow flex justify-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-indigo-400" : "hover:text-gray-300"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/owners"
            className={({ isActive }) =>
              isActive ? "text-indigo-400" : "hover:text-gray-300"
            }
          >
            Owners
          </NavLink>

          <NavLink
            to="/pets"
            className={({ isActive }) =>
              isActive ? "text-indigo-400" : "hover:text-gray-300"
            }
          >
            Pets
          </NavLink>

          {/* Para agregar nuevas entradas */}
          {/* <NavLink
            to="/add-new"
            className={({ isActive }) =>
              isActive ? "text-indigo-400" : "hover:text-gray-300"
            }
          >
            Add New
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
}
