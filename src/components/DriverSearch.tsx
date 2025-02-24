interface DriverSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const DriverSearch = ({ searchTerm, onSearchChange }: DriverSearchProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchTerm); // Déclenche la recherche
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder="Rechercher un chauffeur..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default DriverSearch; 