import { Driver } from '../types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';

interface DriverCardProps {
  driver: Driver;
  onEdit: () => void;
}

const DriverCard = ({ driver, onEdit }: DriverCardProps) => {
  const navigate = useNavigate();
  const [showContract, setShowContract] = useState(false);
  
  // Obtenir les revenus de la semaine en cours ou afficher 0 par défaut
  const currentWeekData = driver.weeklyData[0] || {
    uberRevenue: 0,
    boltRevenue: 0,
    cashRevenue: 0,
    rentalFee: 0
  };

  const totalRevenue = currentWeekData.uberRevenue + currentWeekData.boltRevenue + currentWeekData.cashRevenue;
  const toPay = totalRevenue - currentWeekData.rentalFee;

  return (
    <div 
      onClick={() => navigate(`/accounting/driver/${driver.id}`)}
      className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <img
            src={driver.photo || '/default-avatar.png'} // Image par défaut si pas de photo
            alt={`${driver.firstName} ${driver.lastName}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {driver.firstName} {driver.lastName}
            </h3>
            <span className={`inline-block px-2 py-1 mt-1 text-xs rounded-full ${
              driver.status === 'active' ? 'bg-green-100 text-green-800' :
              driver.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {driver.status === 'active' ? 'Actif' :
               driver.status === 'pending' ? 'En attente' :
               'Inactif'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Revenus semaine</p>
          <p className="text-lg font-semibold text-green-600">{totalRevenue}€</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">À verser</p>
          <p className="text-lg font-semibold text-primary-600">{toPay}€</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowContract(true);
          }}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Voir le contrat
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/accounting/driver/${driver.id}`);
          }}
          className="text-gray-600 hover:text-gray-700 text-sm font-medium"
        >
          Voir détails
        </button>
      </div>

      {showContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Aperçu du Contrat</h3>
              <button onClick={() => setShowContract(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Véhicule:</strong> {driver.rentalInfo?.carName}</p>
              <p><strong>Prix journalier:</strong> {Math.round(driver.rentalInfo?.basePrice / 7)}€</p>
              <p><strong>Date de début:</strong> {format(parseISO(driver.rentalInfo?.startWeek || ''), 'dd/MM/yyyy')}</p>
              <button
                onClick={() => navigate(`/contract/${driver.id}`)}
                className="mt-4 w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700"
              >
                Voir contrat complet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverCard; 