import type { PetDTO } from "../types/Pet";

type PetListTableProps = {
  pets: PetDTO[];
  onDelete: (id: number) => void;
};

export default function PetListTable({ pets, onDelete }: PetListTableProps) {
  if (pets.length === 0) {
    return <p className="text-gray-500 mt-4">No pets registered for this owner.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Race</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Color</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Allergic</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Special Attention</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Observations</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id ?? `${pet.name}-${pet.race}-${Math.random()}`} className="hover:bg-indigo-50 transition">
              <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.race}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.color}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.allergic ? "Yes" : "No"}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.specialAttention ? "Yes" : "No"}</td>
              <td className="border border-gray-300 px-4 py-2 max-w-xs truncate" title={pet.observations}>
                {pet.observations}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => pet.id !== undefined && onDelete(pet.id)}
                  aria-label={`Delete ${pet.name}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  disabled={pet.id === undefined}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
