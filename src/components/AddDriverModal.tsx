import { useState } from 'react';
import { Driver, EmploymentStatus, DriverStatus, WeeklyData } from '../types';

interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (driver: Omit<Driver, 'id'>) => void;
}

const AddDriverModal = ({ isOpen, onClose, onAdd }: AddDriverModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    photo: '',
    status: 'pending' as DriverStatus,
    rentalInfo: {
      startWeek: new Date().toISOString().split('T')[0],
      numberOfWeeks: 4,
      employmentStatus: 'fulltime' as EmploymentStatus,
      basePrice: 400,
      employmentFee: 115,
      tax: 80,
      insurance: 40,
      total: 635,
      contractDate: new Date().toISOString().split('T')[0],
      deposit: 1000,
      carName: '',
      employerFee: 0,
      totalPrice: 0,
      acceptContract: false
    },
    weeklyData: [] as WeeklyData[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      photo: '',
      status: 'pending' as DriverStatus,
      rentalInfo: {
        ...formData.rentalInfo,
        carName: '',
        employerFee: 0,
        totalPrice: 0,
        acceptContract: false
      },
      weeklyData: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Ajouter un chauffeur</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="url"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Véhicule assigné</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.rentalInfo.carName}
              onChange={(e) => setFormData({ 
                ...formData, 
                rentalInfo: { ...formData.rentalInfo, carName: e.target.value } 
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date d'entrée</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.rentalInfo.startWeek}
              onChange={(e) => setFormData({ 
                ...formData, 
                rentalInfo: { ...formData.rentalInfo, startWeek: e.target.value } 
              })}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriverModal; 