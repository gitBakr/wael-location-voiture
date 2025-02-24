import { useState, useEffect } from 'react';
import { getDrivers, addDriver, updateDriver } from '../utils/driverManager';
import DriverSearch from '../components/DriverSearch';
import DriverCard from '../components/DriverCard';
import AddDriverModal from '../components/AddDriverModal';
import EditDriverModal from '../components/EditDriverModal';
import { Driver, DriverStatus } from '../types';
import { toast } from 'react-hot-toast';

const Accounting = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Vérifier le localStorage au chargement
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [localDrivers, setLocalDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<DriverStatus | 'all'>('all');
  const [showDrivers, setShowDrivers] = useState(false);

  useEffect(() => {
    setLocalDrivers(getDrivers());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'waelleboss') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Connexion réussie');
    } else {
      setError('Mot de passe incorrect');
      toast.error('Mot de passe incorrect');
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleAddDriver = (newDriver: Omit<Driver, 'id'>) => {
    addDriver(newDriver);
    setLocalDrivers(getDrivers());
    toast.success('Chauffeur ajouté avec succès');
  };

  const handleUpdateDriver = (driverId: string, updatedData: Partial<Driver>) => {
    const updated = updateDriver(driverId, updatedData);
    if (updated) {
      setLocalDrivers(getDrivers());
      toast.success('Informations mises à jour');
    } else {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsEditModalOpen(true);
  };

  const filteredDrivers = localDrivers.filter(driver => {
    if (!showDrivers) return false;
    if (driver.status === 'inactive') return false;

    const searchTermLower = searchTerm.toLowerCase();
    const firstName = (driver.firstName || '').toLowerCase();
    const lastName = (driver.lastName || '').toLowerCase();
    const fullName = `${firstName} ${lastName}`;

    const matchesSearch = searchTermLower === '' || 
      fullName.includes(searchTermLower);

    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const calculateGlobalStats = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    let totalRevenue = 0;
    let totalRental = 0;
    let totalProfit = 0;
    let totalExpenses = 0;

    localDrivers.forEach(driver => {
      driver.weeklyData.forEach(week => {
        const weekDate = new Date(week.week);
        if (weekDate.getMonth() + 1 === currentMonth && weekDate.getFullYear() === currentYear) {
          const weekRevenue = week.uberRevenue + week.boltRevenue + week.cashRevenue;
          totalRevenue += weekRevenue;
          totalRental += week.rentalFee;
          
          const weekExpenses = week.expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
          totalExpenses += weekExpenses;
          
          totalProfit += (weekRevenue - week.rentalFee - weekExpenses);
        }
      });
    });

    return { totalRevenue, totalRental, totalProfit, totalExpenses };
  };

  const showAllDrivers = () => {
    setSearchTerm('');
    setShowDrivers(true);
  };

  if (isAuthenticated) {
    const stats = calculateGlobalStats();
    
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Résumé financier global */}
        <div className="mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Résumé du mois</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Revenus totaux</h3>
              <p className="text-2xl font-bold text-green-600">{stats.totalRevenue}€</p>
              <p className="text-sm text-green-700 mt-1">Tous chauffeurs confondus</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Locations perçues</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.totalRental}€</p>
              <p className="text-sm text-blue-700 mt-1">Total des locations</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-red-800">Dépenses exceptionnelles</h3>
              <p className="text-2xl font-bold text-red-600">{stats.totalExpenses}€</p>
              <p className="text-sm text-red-700 mt-1">Réparations et autres frais</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800">Revenus chauffeurs</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.totalProfit}€</p>
              <p className="text-sm text-purple-700 mt-1">À verser aux chauffeurs</p>
            </div>
          </div>
        </div>

        {/* Titre et boutons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 space-y-3 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des Chauffeurs</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={showAllDrivers}
              className="w-full sm:w-auto px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50"
            >
              Voir tous les chauffeurs
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Ajouter un chauffeur
            </button>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DriverStatus | 'all')}
            className="w-full sm:w-auto rounded-md border-gray-300"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="active">Actifs</option>
          </select>
          <div className="flex-grow">
            <DriverSearch 
              searchTerm={searchTerm} 
              onSearchChange={handleSearch} 
            />
          </div>
        </div>

        {/* Liste des chauffeurs */}
        <div className="mt-4 sm:mt-6">
          {!showDrivers ? (
            <div className="text-center">
              <p className="text-gray-500">Cliquez sur "Voir tous les chauffeurs" pour afficher la liste</p>
            </div>
          ) : (
            filteredDrivers.length === 0 ? (
              <p className="text-center text-gray-500">Aucun chauffeur trouvé</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                {filteredDrivers.map(driver => (
                  <DriverCard 
                    key={driver.id} 
                    driver={driver}
                    onEdit={() => handleEditDriver(driver)}
                  />
                ))}
              </div>
            )
          )}
        </div>

        <AddDriverModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddDriver}
        />

        {selectedDriver && (
          <EditDriverModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={handleUpdateDriver}
            driver={selectedDriver}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Accès Comptabilité
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Accéder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Accounting; 