import React, { useState } from "react";
import { createOwner } from "../api/ownerApi";
import { createPet } from "../api/petApi";
import OwnerForm from "../components/OwnerForm";
import PetFormItem from "../components/PetFormItem";
import { useNavigate } from "react-router-dom";


type PetForm = {
  name: string;
  race: string;
  color: string;
  allergic: boolean;
  specialAttention: boolean;
  observations: string;
};

export default function AddNewClient() {
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const navigate = useNavigate();

  const [pets, setPets] = useState<PetForm[]>([
    {
      name: "",
      race: "",
      color: "",
      allergic: false,
      specialAttention: false,
      observations: "",
    },
  ]);
  const [error, setError] = useState<string | null>(null);

  const handlePetChange = (
    index: number,
    field: keyof PetForm,
    value: string | boolean
  ) => {
    const updatedPets = [...pets];
    updatedPets[index][field] = value;
    setPets(updatedPets);
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
      const ownerResponse = await createOwner({
        name: ownerName,
        phoneNumber: ownerPhone,
      });

      const ownerId = ownerResponse.data.id;

      for (const pet of pets) {
        await createPet({
          ...pet,
          allergic: pet.allergic ? "true" : "false",
          specialAttention: pet.specialAttention ? "true" : "false",
          ownerId,
        });
      }

      alert("Client and pets saved successfully!");
      navigate(`/owners/${ownerId}`);


      setOwnerName("");
      setOwnerPhone("");
      setPets([
        {
          name: "",
          race: "",
          color: "",
          allergic: false,
          specialAttention: false,
          observations: "",
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("Error registering");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Add New Client</h1>

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
              key={index}
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
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Add another pet
          </button>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Save Client & Pets
        </button>
      </form>
    </div>
  );
}
