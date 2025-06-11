import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Pet = {
  id?: number;
  name: string;
  race: string;
  ownerId?: number;
  shidtDateTime?: string;
};

type PetTableProps = {
  pets: Pet[];
  ownersMap: Record<number, string>;
  onViewOwner: (ownerId: number) => void;
  onDeletePet: (petId: number) => void;
};

export default function PetTable({ pets, ownersMap, onViewOwner, onDeletePet }: PetTableProps) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "past" | "today" | "future">("all");

  const handleDelete = (petId?: number) => {
    if (petId !== undefined) {
      onDeletePet(petId);
    } else {
      console.error("Pet id is undefined");
    }
  };

  function classifyDate(shidtDateTime?: string) {
    if (!shidtDateTime || isNaN(Date.parse(shidtDateTime))) return "unknown";

    const now = new Date();
    const date = new Date(shidtDateTime);

    const isSameDate =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    if (date < now && !isSameDate) {
      return "past";
    } else if (isSameDate) {
      return "today";
    } else {
      return "future";
    }
  }

  function getRowClass(shidtDateTime?: string) {
    const classification = classifyDate(shidtDateTime);
    switch (classification) {
      case "past":
        return "bg-green-100";
      case "today":
        return "bg-yellow-100";
      case "future":
        return "bg-blue-100";
      default:
        return "";
    }
  }

  const filteredPets = [...pets]
    .filter((pet) => {
      if (filter === "all") return true;
      return classifyDate(pet.shidtDateTime) === filter;
    })
    .sort((a, b) => {
      const dateA = a.shidtDateTime ? Date.parse(a.shidtDateTime) : 0;
      const dateB = b.shidtDateTime ? Date.parse(b.shidtDateTime) : 0;
      return dateA - dateB;
    });

  const legendButtonClass = (type: string) =>
    `flex items-center space-x-2 cursor-pointer select-none ${
      filter === type ? "font-semibold underline" : "opacity-70 hover:opacity-100"
    }`;

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex space-x-6">
        <div className={legendButtonClass("all")} onClick={() => setFilter("all")} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setFilter("all")}>
          <div className="w-5 h-5 border border-gray-400 rounded bg-gray-100"></div>
          <span className="text-sm text-gray-700">All</span>
        </div>

        <div className={legendButtonClass("past")} onClick={() => setFilter("past")} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setFilter("past")}>
          <div className="w-5 h-5 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-sm text-gray-700">Completed (Past)</span>
        </div>
        <div className={legendButtonClass("today")} onClick={() => setFilter("today")} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setFilter("today")}>
          <div className="w-5 h-5 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span className="text-sm text-gray-700">Today</span>
        </div>
        <div className={legendButtonClass("future")} onClick={() => setFilter("future")} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setFilter("future")}>
          <div className="w-5 h-5 bg-blue-100 border border-blue-300 rounded"></div>
          <span className="text-sm text-gray-700">Upcoming (Future)</span>
        </div>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Appointment Date and Time</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Race</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Owner</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <tr
                key={pet.id ?? `${pet.name}-${pet.race}-${Math.random()}`}
                className={`${getRowClass(pet.shidtDateTime)}`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {pet.shidtDateTime && !isNaN(Date.parse(pet.shidtDateTime))
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(pet.shidtDateTime))
                    : "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
                <td className="border border-gray-300 px-4 py-2">{pet.race}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {pet.ownerId != null ? ownersMap[pet.ownerId] ?? "Loading..." : "Owner info missing"}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  {pet.ownerId != null ? (
                    <>
                      <button
                        onClick={() => onViewOwner(pet.ownerId!)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        aria-label={`View owner of ${pet.name}`}
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/edit-client/${pet.ownerId}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        aria-label={`Edit owner of ${pet.name}`}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 italic">Owner info missing</span>
                  )}
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    aria-label={`Delete pet ${pet.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No pets found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
