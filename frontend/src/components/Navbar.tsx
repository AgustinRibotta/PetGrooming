import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center h-16 px-4 relative">

        <div className="flex-shrink-0 flex items-center gap-2">
          <span>🐶</span> 
          <span className="text-xs text-indigo-400 font-semibold select-none">v1.0</span> 
        </div>

        <div className="flex-grow flex justify-center space-x-8">
          {["/", "/owners", "/pets"].map((path, idx) => {
            const names = ["Home", "Owners", "Pets"];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative transition-colors duration-300 ${
                    isActive ? "text-indigo-400" : "hover:text-gray-300"
                  }`
                }
              >
                {names[idx]}
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 scale-x-0 origin-left transition-transform duration-300
                  group-hover:scale-x-100"
                  style={{ transformOrigin: 'left' }}
                />
              </NavLink>
            );
          })}
        </div>

        <div className="absolute right-4 md:hidden cursor-pointer select-none" title="Menu (not functional)">
          <div className="w-6 h-0.5 bg-gray-400 mb-1 rounded"></div>
          <div className="w-6 h-0.5 bg-gray-400 mb-1 rounded"></div>
          <div className="w-6 h-0.5 bg-gray-400 rounded"></div>
        </div>
      </div>
    </nav>
  );
}
