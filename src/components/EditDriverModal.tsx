import { useState, useEffect } from 'react';
import { Driver } from '../types/driver';

interface EditDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver;
  onUpdate: (driverId: string, data: Partial<Driver>) => void;
  allowWeeklyData?: boolean;
}

const EditDriverModal = ({ isOpen, onClose, onUpdate, driver }: EditDriverModalProps) => {
  const [formData, setFormData] = useState({
    ...driver,
    newExpense: {
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0]
    }
  });

  useEffect(() => {
    setFormData({
      ...driver,
      newExpense: {
        description: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0]
      }
    });
  }, [driver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(driver.id, formData);
    onClose();
  };

  const handleAddExpense = () => {
    if (!formData.newExpense.description.trim()) {
      alert('Veuillez ajouter une description pour la dépense');
      return;
    }

    const currentWeek = formData.weeklyData[0] || {
      week: new Date().toISOString().split('T')[0],
      uberRevenue: 0,
      boltRevenue: 0,
      cashRevenue: 0,
      rentalFee: 400,
      expenses: []
    };

    const updatedWeeklyData = [{
      ...currentWeek,
      expenses: [
        ...(currentWeek.expenses || []),
        {
          description: formData.newExpense.description.trim(),
          amount: formData.newExpense.amount,
          date: formData.newExpense.date,
          type: 'manager'
        }
      ]
    }, ...formData.weeklyData.slice(1)];

    setFormData({
      ...formData,
      weeklyData: updatedWeeklyData,
      newExpense: { description: '', amount: 0, date: new Date().toISOString().split('T')[0] }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Modifier le chauffeur</h3>
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              value={formData.carAssigned}
              onChange={(e) => setFormData({ ...formData, carAssigned: e.target.value })}
            />
          </div>

          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-medium mb-2">Ajouter une dépense exceptionnelle</h3>
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="Description (ex: Réparation rayure)"
                value={formData.newExpense.description}
                onChange={(e) => setFormData({
                  ...formData,
                  newExpense: { ...formData.newExpense, description: e.target.value }
                })}
                className="rounded-md border-gray-300"
              />
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="Montant en €"
                value={formData.newExpense.amount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({
                    ...formData,
                    newExpense: { ...formData.newExpense, amount: Number(value) }
                  });
                }}
                className="rounded-md border-gray-300"
              />
              <input
                type="date"
                value={formData.newExpense.date}
                onChange={(e) => setFormData({
                  ...formData,
                  newExpense: { ...formData.newExpense, date: e.target.value }
                })}
                className="rounded-md border-gray-300"
              />
              <button
                type="button"
                onClick={handleAddExpense}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Ajouter la dépense
              </button>
            </div>
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
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDriverModal; 