import { useParams } from 'react-router-dom';
import { drivers } from '../data/drivers';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const DriverDetails = () => {
  const { id } = useParams();
  const driver = drivers.find(d => d.id === id);

  if (!driver) {
    return <div>Chauffeur non trouvé</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête du chauffeur */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={driver.photo}
            alt={driver.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{driver.name}</h1>
            <p className="text-gray-500">{driver.carAssigned}</p>
            <p className="text-gray-500">{driver.phone}</p>
          </div>
        </div>
      </div>

      {/* Données hebdomadaires */}
      <div className="space-y-6">
        {driver.weeklyData.map((week) => (
          <div key={week.week} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Semaine du {format(parseISO(week.week), 'dd MMMM yyyy', { locale: fr })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revenus */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Revenus</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uber</span>
                    <span className="font-medium text-gray-900">{week.uberRevenue}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bolt</span>
                    <span className="font-medium text-gray-900">{week.boltRevenue}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Espèces</span>
                    <span className="font-medium text-gray-900">{week.cashRevenue}€</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Total Revenus</span>
                      <span className="font-bold text-green-600">
                        {week.uberRevenue + week.boltRevenue + week.cashRevenue}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calcul final */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Bilan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Revenus</span>
                    <span className="font-medium text-gray-900">
                      {week.uberRevenue + week.boltRevenue + week.cashRevenue}€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location véhicule</span>
                    <span className="font-medium text-red-600">-{week.rentalFee}€</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">À verser au chauffeur</span>
                      <span className="font-bold text-primary-600">
                        {week.uberRevenue + week.boltRevenue + week.cashRevenue - week.rentalFee}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverDetails; 