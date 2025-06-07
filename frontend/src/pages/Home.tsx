import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to Doggy Grooming App</h1>
      <p className="mb-6 text-gray-700 text-lg">
        Manage your furry friends' grooming appointments easily and keep them looking fabulous!
      </p>

      <div className="flex space-x-4">
                <Link
          to="/add-new"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add New Client
        </Link>

        <Link
          to="/pets"
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          View Pets
        </Link>

        <Link
          to="/owners"
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          View Owners
        </Link>

      </div>
    </div>
  );
}
