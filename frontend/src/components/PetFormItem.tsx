import React from "react";

type PetForm = {
  name: string;
  race: string;
  color: string;
  allergic: boolean;
  specialAttention: boolean;
  observations: string;
};

type Props = {
  pet: PetForm;
  index: number;
  onChange: (index: number, field: keyof PetForm, value: string | boolean) => void;
  onRemove: () => void;
  canRemove: boolean;
};

export default function PetFormItem({ pet, index, onChange, onRemove, canRemove }: Props) {
  return (
    <div className="mb-6 p-4 border border-gray-300 rounded relative">
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
          title="Remove this pet"
        >
          &times;
        </button>
      )}

      <div className="mb-3">
        <label className="block font-semibold mb-1" htmlFor={`petName${index}`}>
          Name *
        </label>
        <input
          id={`petName${index}`}
          type="text"
          value={pet.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-semibold mb-1" htmlFor={`petRace${index}`}>
          Race
        </label>
        <input
          id={`petRace${index}`}
          type="text"
          value={pet.race}
          onChange={(e) => onChange(index, "race", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-3">
        <label className="block font-semibold mb-1" htmlFor={`petColor${index}`}>
          Color
        </label>
        <input
          id={`petColor${index}`}
          type="text"
          value={pet.color}
          onChange={(e) => onChange(index, "color", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-6 mb-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={pet.allergic}
            onChange={(e) => onChange(index, "allergic", e.target.checked)}
          />
          <span>Allergic</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={pet.specialAttention}
            onChange={(e) => onChange(index, "specialAttention", e.target.checked)}
          />
          <span>Special Attention</span>
        </label>
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor={`petObservations${index}`}>
          Observations
        </label>
        <textarea
          id={`petObservations${index}`}
          value={pet.observations}
          onChange={(e) => onChange(index, "observations", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={2}
        />
      </div>
    </div>
  );
}
