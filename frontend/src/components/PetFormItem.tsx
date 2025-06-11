import type { PetDTO } from "../types/Pet";

type Props = {
  pet: PetDTO;
  index: number;
  onChange: (index: number, field: keyof PetDTO, value: string | boolean) => void;
  onRemove: () => void;
  canRemove: boolean;
};

export default function PetFormItem({ pet, index, onChange, onRemove, canRemove }: Props) {
  const toDateTimeLocal = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  return (
    <div className="mb-6 p-4 border border-gray-300 rounded relative bg-white shadow-sm transition animate-fadeIn">
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove pet ${pet.name || index + 1}`}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
        >
          &times;
        </button>
      )}
      <div className="mb-3">
        <label htmlFor={`petShiftDateTime${index}`} className="block font-semibold mb-1">
          Appointment Date and Time
        </label>
        <input
          id={`petShiftDateTime${index}`}
          type="datetime-local"
          value={toDateTimeLocal(pet.shidtDateTime)} 
          onChange={(e) => onChange(index, "shidtDateTime", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`petName${index}`} className="block font-semibold mb-1">
          Name *
        </label>
        <input
          id={`petName${index}`}
          type="text"
          value={pet.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor={`petRace${index}`} className="block font-semibold mb-1">
          Race
        </label>
        <input
          id={`petRace${index}`}
          type="text"
          value={pet.race}
          onChange={(e) => onChange(index, "race", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      <div className="mb-3">
        <label htmlFor={`petColor${index}`} className="block font-semibold mb-1">
          Color
        </label>
        <input
          id={`petColor${index}`}
          type="text"
          value={pet.color}
          onChange={(e) => onChange(index, "color", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      <div className="flex flex-wrap gap-6 mb-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!pet.allergic}
            onChange={(e) => onChange(index, "allergic", e.target.checked)}
            className="accent-indigo-600"
          />
          <span>Allergic</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!pet.specialAttention}
            onChange={(e) => onChange(index, "specialAttention", e.target.checked)}
            className="accent-indigo-600"
          />
          <span>Special Attention</span>
        </label>
      </div>

      <div>
        <label htmlFor={`petObservations${index}`} className="block font-semibold mb-1">
          Observations
        </label>
        <textarea
          id={`petObservations${index}`}
          value={pet.observations}
          onChange={(e) => onChange(index, "observations", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          rows={2}
        />
      </div>
    </div>
  );
}
