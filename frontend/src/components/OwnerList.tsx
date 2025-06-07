import { useEffect, useState } from "react";
import { getAllOwners } from "../api/ownerApi";
import type { OwnerDTO } from "../types/Owner";
import { Users, Phone, PawPrint } from "lucide-react";

export default function OwnerList() {
  const [owners, setOwners] = useState<OwnerDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllOwners()
      .then(res => {
        setOwners(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-doggy-dark text-center mt-6">🐾 Cargando dueños...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">❌ Error al obtener los datos.</p>;

  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold flex items-center gap-2 mb-6 text-doggy-dark">
        <Users className="w-7 h-7" />
        Dueños registrados
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {owners.map(owner => (
          <div
            key={owner.id}
            className="bg-doggy-light rounded-2xl p-6 border-2 border-doggy shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              🧑 {owner.name}
            </h3>
            <p className="text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              {owner.phoneNumber}
            </p>
            <p className="text-gray-700 flex items-center gap-2 mt-1">
              <PawPrint className="w-4 h-4 text-gray-500" />
              Mascotas registradas: {owner.petCount}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
