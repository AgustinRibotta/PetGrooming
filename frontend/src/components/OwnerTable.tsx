import { useNavigate } from "react-router-dom";
import type { OwnerDTO } from "../types/Owner";

type OwnerTableProps = {
  owners: OwnerDTO[];
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void;
};

export default function OwnerTable({ owners, onView, onDelete }: OwnerTableProps) {
  const navigate = useNavigate();

  function safeCallId(id: number | undefined, fn: (id: number) => void) {
    if (id !== undefined) {
      fn(id);
    }
  }

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-indigo-100">
          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Pet Count</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {owners.length > 0 ? (
          owners.map((owner) => (
            <tr key={owner.id ?? Math.random()} className="hover:bg-indigo-50">
              <td className="border border-gray-300 px-4 py-2">{owner.name}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.phoneNumber}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.petCount ?? 0}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  onClick={() => safeCallId(owner.id, onView)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
                  disabled={owner.id === undefined}
                >
                  View
                </button>
                <button
                  onClick={() => safeCallId(owner.id, (id) => navigate(`/edit-client/${id}`))}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  disabled={owner.id === undefined}
                >
                  Edit
                </button>
                <button
                  onClick={() => safeCallId(owner.id, onDelete)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  disabled={owner.id === undefined}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center py-4 text-gray-500">
              No owners found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
