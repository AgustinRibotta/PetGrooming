import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOwnerById } from "../api/ownerApi";
import { getAllPets, deletePet } from "../api/petApi"; 
import type { OwnerDTO } from "../types/Owner";
import type { PetDTO } from "../types/Pet";
import PetListTable from "../components/PetListTable";

export default function OwnerDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [owner, setOwner] = useState<OwnerDTO | null>(null);
  const [pets, setPets] = useState<PetDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ownerId = Number(id);
    if (!ownerId) return;

    async function fetchData() {
      try {
        const ownerRes = await getOwnerById(ownerId);
        setOwner(ownerRes.data);

        const petsRes = await getAllPets();
        const ownerPets = petsRes.data.filter(pet => pet.ownerId === ownerId);
        setPets(ownerPets);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  async function handleDeletePet(petId: number) {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;

    try {
      await deletePet(petId);
      setPets((prev) => prev.filter(pet => pet.id !== petId));
    } catch (err) {
      alert("Failed to delete pet");
    }
  }

  if (loading) return <p className="p-6 text-center">Loading owner...</p>;
  if (!owner) return <p className="p-6 text-center text-red-600">Owner not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-600">Owner Details</h2>
        <button
          onClick={() => navigate(`/edit-client/${owner.id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ✏️ Edit
        </button>
      </div>
      <p><strong>Name:</strong> {owner.name}</p>
      <p><strong>Phone Number:</strong> {owner.phoneNumber}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-indigo-500">Pets:</h3>
      <PetListTable pets={pets} onDelete={handleDeletePet} />
    </div>
  );
}
