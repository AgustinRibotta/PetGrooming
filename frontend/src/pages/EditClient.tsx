import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOwnerById, updateOwner } from "../api/ownerApi";
import { getAllPets, updatePet, createPet } from "../api/petApi"; // Omitimos deletePet
import OwnerForm from "../components/OwnerForm";
import PetFormItem from "../components/PetFormItem";
import type { PetDTO } from "../types/Pet";

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [pets, setPets] = useState<(PetDTO & { id?: number })[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerAndPets = async () => {
      try {
        const ownerId = Number(id);
        const ownerRes = await getOwnerById(ownerId);
        const allPetsRes = await getAllPets();

        setOwnerName(ownerRes.data.name);
        setOwnerPhone(ownerRes.data.phoneNumber);

        const ownerPets = allPetsRes.data.filter(p => p.ownerId === ownerId);
        setPets(ownerPets);
      } catch (err) {
        console.error("Error loading data", err);
        setError("Error loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerAndPets();
  }, [id]);

  const handlePetChange = (
    index: number,
    field: keyof PetDTO,
    value: string | boolean
  ) => {
    setPets((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const addPet = () => {
    setPets([
      ...pets,
      {
        name: "",
        race: "",
        color: "",
        allergic: false,
        specialAttention: false,
        observations: "",
      },
    ]);
  };

  const removePet = (index: number) => {
    if (pets.length === 1) return;
    setPets(pets.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ownerName.trim()) {
      setError("Owner name is required");
      return;
    }

    const hasEmptyPetName = pets.some((pet) => !pet.name.trim());
    if (hasEmptyPetName) {
      setError("All pets must have a name");
      return;
    }

    setError(null);

    try {
      const ownerId = Number(id);
      await updateOwner(ownerId, {
        name: ownerName,
        phoneNumber: ownerPhone,
      });

      for (const pet of pets) {
        const petData = {
          ...pet,
          allergic: !!pet.allergic,          
          specialAttention: !!pet.specialAttention,
          ownerId,
        };

        if (pet.id) {
          await updatePet(pet.id, petData);
        } else {
          await createPet(petData);
        }
      }

      alert("Client and pets updated successfully!");
      navigate(`/owners/${ownerId}`);
    } catch (err) {
      console.error(err);
      setError("Error saving changes. Check console for details.");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Edit Client</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <OwnerForm
          ownerName={ownerName}
          setOwnerName={setOwnerName}
          ownerPhone={ownerPhone}
          setOwnerPhone={setOwnerPhone}
        />

        <div>
          <h2 className="text-xl font-semibold mb-4 text-indigo-500">Pets</h2>
          {pets.map((pet, index) => (
            <PetFormItem
              key={pet.id ?? `new-${index}`}
              pet={pet}
              index={index}
              onChange={handlePetChange}
              onRemove={() => removePet(index)}
              canRemove={pets.length > 1}
            />
          ))}

          <button
            type="button"
            onClick={addPet}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            <span>➕</span> Add another pet
          </button>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
