import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOwners, deleteOwner } from "../api/ownerApi"; 
import OwnerTable from "../components/OwnerTable";
import type { OwnerDTO } from "../types/Owner";

export default function Owners() {
  const [owners, setOwners] = useState<OwnerDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchOwners();
  }, []);

  async function fetchOwners() {
    try {
      setLoading(true);
      const response = await getAllOwners();
      setOwners(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load owners");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;

    try {
      await deleteOwner(id);
      setOwners((prev) => prev.filter((owner) => owner.id !== id));
    } catch (err) {
      alert("Failed to delete owner");
    }
  }

  const handleEdit = (id: number) => {
    navigate(`/edit-client/${id}`);
  };

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-md mt-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Owner List</h1>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by owner name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-full px-10 py-2 border border-gray-300 rounded focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
        <span className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">🔍</span>
      </div>

      {loading ? (
        <p className="text-center text-indigo-600 font-semibold py-10">Loading owners...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-10">{error}</p>
      ) : filteredOwners.length === 0 ? (
        <p className="text-center text-gray-500 italic py-10">No owners match your search.</p>
      ) : (
        <OwnerTable
          owners={filteredOwners}
          onView={(id) => navigate(`/owners/${id}`)}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
