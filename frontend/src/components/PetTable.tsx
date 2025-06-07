import { useNavigate } from "react-router-dom";

type Pet = {
  id?: number;
  name: string;
  race: string;
  ownerId?: number;
};

type PetTableProps = {
  pets: Pet[];
  ownersMap: Record<number, string>;
  onViewOwner: (ownerId: number) => void;
  onDeletePet: (petId: number) => void;
};

export default function PetTable({ pets, ownersMap, onViewOwner, onDeletePet }: PetTableProps) {
  const navigate = useNavigate();

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-indigo-100">
          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Race</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Owner</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <tr key={pet.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.race}</td>
              <td className="border border-gray-300 px-4 py-2">
                {pet.ownerId !== undefined ? ownersMap[pet.ownerId] || "Loading..." : "Owner info missing"}
              </td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                {pet.ownerId !== undefined ? (
                  <>
                    <button
                      onClick={() => onViewOwner(pet.ownerId!)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/edit-client/${pet.ownerId}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <span className="text-gray-500 italic">Owner info missing</span>
                )}
                <button
                  onClick={() => {
                        if (pet.id !== undefined) {
                          onDeletePet(pet.id);
                        } else {
                          console.error("Pet id is undefined");
                        }
                      }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center py-4 text-gray-500">
              No pets found matching your criteria.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
