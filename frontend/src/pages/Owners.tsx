import React, { useEffect, useState } from "react";
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

  // Función para editar: navegar a la ruta de edición
  const handleEdit = (id: number) => {
    navigate(`/edit-client/${id}`);
  };

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  if (loading) return <p className="p-6 text-center">Loading owners...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Owner List</h1>

      <input
        type="text"
        placeholder="Search by owner name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
      />

      <OwnerTable
        owners={filteredOwners}
        onView={(id) => navigate(`/owners/${id}`)}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
