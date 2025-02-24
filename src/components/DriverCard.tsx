import { Driver } from '../types/driver';
import { useNavigate } from 'react-router-dom';

interface DriverCardProps {
  driver: Driver;
}

const DriverCard = ({ driver }: DriverCardProps) => {
  const navigate = useNavigate();
  const currentWeekData = driver.weeklyData[0];
  const totalRevenue = currentWeekData.uberRevenue + currentWeekData.boltRevenue + currentWeekData.cashRevenue;
  const toPay = totalRevenue - currentWeekData.rentalFee;

  const handleClick = () => {
    navigate(`/accounting/driver/${driver.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <img
          src={driver.photo}
          alt={driver.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
          <p className="text-sm text-gray-500">{driver.carAssigned}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Revenus totaux</p>
          <p className="text-lg font-semibold text-green-600">{totalRevenue}€</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">À verser</p>
          <p className="text-lg font-semibold text-primary-600">{toPay}€</p>
        </div>
      </div>
    </div>
  );
};

export default DriverCard; 