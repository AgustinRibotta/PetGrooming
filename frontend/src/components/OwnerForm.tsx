type Props = {
  ownerName: string;
  setOwnerName: (name: string) => void;
  ownerPhone: string;
  setOwnerPhone: (phone: string) => void;
};

export default function OwnerForm({
  ownerName,
  setOwnerName,
  ownerPhone,
  setOwnerPhone,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="ownerName" className="block font-medium text-gray-700 mb-1">
          Owner Name <span className="text-red-500">*</span>
        </label>
        <input
          id="ownerName"
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
      </div>

      <div>
        <label htmlFor="ownerPhone" className="block font-medium text-gray-700 mb-1">
          Owner Phone
        </label>
        <input
          id="ownerPhone"
          type="text"
          value={ownerPhone}
          onChange={(e) => setOwnerPhone(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
    </div>
  );
}
