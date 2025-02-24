import { useState } from 'react';
import ReservationModal from './ReservationModal';

interface CarCardProps {
  name: string;
  image: string;
  category: string;
  seats: number;
  transmission: string;
}

const CarCard = ({ name, image, category, seats, transmission }: CarCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Prix journalier fixe à 57€
  const dailyPrice = 57;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img className="w-full h-48 object-cover" src={image} alt={name} />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{category}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            {seats} places
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
            </svg>
            {transmission}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-lg font-bold text-primary-600">{dailyPrice}€<span className="text-sm font-normal">/jour</span></p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carName={name}
        pricePerDay={dailyPrice}
        carImage={image}
      />
    </>
  );
};

export default CarCard;
