import { useEffect, useState } from "react";
import { getAllPets, deletePet } from "../api/petApi"; 
import { getOwnerById } from "../api/ownerApi";
import { useNavigate } from "react-router-dom";
import PetTable from "../components/PetTable";
import type { PetDTO } from "../types/Pet";

export default function Pets() {
  const [pets, setPets] = useState<PetDTO[]>([]);
  const [ownersMap, setOwnersMap] = useState<Record<number, string>>({});

  const [petNameFilter, setPetNameFilter] = useState("");
  const [ownerNameFilter, setOwnerNameFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllPets()
      .then(async (res) => {
        const petsData: PetDTO[] = res.data;
        setPets(petsData);

        const petsWithOwner = petsData.filter((pet): pet is PetDTO & { ownerId: number } => pet.ownerId !== undefined);

        const uniqueOwnerIds = Array.from(new Set(petsWithOwner.map((pet) => pet.ownerId)));

        const ownersPromises = uniqueOwnerIds.map((ownerId) =>
          getOwnerById(ownerId).then((res) => ({
            ownerId,
            ownerName: res.data.name,
          }))
        );

        const ownersResults = await Promise.all(ownersPromises);

        const ownersMapTemp: Record<number, string> = {};
        ownersResults.forEach(({ ownerId, ownerName }) => {
          ownersMapTemp[ownerId] = ownerName; 
        });

        setOwnersMap(ownersMapTemp);
      })
      .catch((err) => console.error("Error loading pets or owners:", err));
  }, []);

  async function handleDeletePet(petId: number) {
    try {
      await deletePet(petId);
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.error("Failed to delete pet:", error);
    }
  }

  const filteredPets: PetDTO[] = pets.filter((pet) => {
    const petNameMatch = pet.name.toLowerCase().includes(petNameFilter.toLowerCase());
    const ownerName = pet.ownerId !== undefined ? ownersMap[pet.ownerId] || "" : "";
    const ownerNameMatch = ownerName.toLowerCase().includes(ownerNameFilter.toLowerCase());
    return petNameMatch && ownerNameMatch;
  });

  const petsWithIdAndOwner = filteredPets.filter(
    (pet): pet is PetDTO => pet.id !== undefined && pet.ownerId !== undefined
  )

    
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Pets List</h1>

      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by pet name"
          value={petNameFilter}
          onChange={(e) => setPetNameFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-1/2"
        />
        <input
          type="text"
          placeholder="Search by owner name"
          value={ownerNameFilter}
          onChange={(e) => setOwnerNameFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-1/2"
        />
      </div>

      <PetTable
        pets={petsWithIdAndOwner}
        ownersMap={ownersMap}
        onViewOwner={(ownerId) => navigate(`/owners/${ownerId}`)}
        onDeletePet={handleDeletePet}
      />
    </div>
  );
}
