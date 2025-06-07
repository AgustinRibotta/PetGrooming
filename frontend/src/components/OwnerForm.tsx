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
    <>
      <div>
        <label htmlFor="ownerName" className="block font-semibold mb-1">
          Owner Name *
        </label>
        <input
          id="ownerName"
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="ownerPhone" className="block font-semibold mb-1">
          Owner Phone
        </label>
        <input
          id="ownerPhone"
          type="text"
          value={ownerPhone}
          onChange={(e) => setOwnerPhone(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
    </>
  );
}
