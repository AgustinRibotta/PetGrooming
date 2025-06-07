import type { PetDTO } from "../types/Pet";

type PetListTableProps = {
  pets: PetDTO[];
  onDelete: (id: number) => void; // nueva prop para eliminar
};

export default function PetListTable({ pets, onDelete }: PetListTableProps) {
  if (pets.length === 0) {
    return <p className="text-gray-500">No pets registered for this owner.</p>;
  }

  return (
    <table className="min-w-full border-collapse border border-gray-300 mt-2">
      <thead>
        <tr className="bg-indigo-100">
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Race</th>
          <th className="border border-gray-300 px-4 py-2">Color</th>
          <th className="border border-gray-300 px-4 py-2">Allergic</th>
          <th className="border border-gray-300 px-4 py-2">Special Attention</th>
          <th className="border border-gray-300 px-4 py-2">Observations</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th> 
        </tr>
      </thead>
      <tbody>
        {pets.map((pet) => (
          <tr key={pet.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
            <td className="border border-gray-300 px-4 py-2">{pet.race}</td>
            <td className="border border-gray-300 px-4 py-2">{pet.color}</td>
            <td className="border border-gray-300 px-4 py-2">{pet.allergic ? "Yes" : "No"}</td>
            <td className="border border-gray-300 px-4 py-2">{pet.specialAttention ? "Yes" : "No"}</td>
            <td className="border border-gray-300 px-4 py-2">{pet.observations}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => pet.id !== undefined && onDelete(pet.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
