import { useState } from 'react';
import { Driver, WeeklyData } from '../types/driver';

interface UpdateDriverDataProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver;
  onUpdate: (driverId: string, weekData: WeeklyData) => void;
}

const UpdateDriverData = ({ isOpen, onClose, driver, onUpdate }: UpdateDriverDataProps) => {
  const [formData, setFormData] = useState<WeeklyData>({
    week: new Date().toISOString().split('T')[0],
    uberRevenue: 0,
    boltRevenue: 0,
    cashRevenue: 0,
    rentalFee: 400,
    expenses: []
  });

  const [newExpense, setNewExpense] = useState({
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const addExpense = () => {
    if (newExpense.amount > 0 && newExpense.description) {
      setFormData({
        ...formData,
        expenses: [...(formData.expenses || []), newExpense]
      });
      setNewExpense({
        amount: 0,
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const removeExpense = (index: number) => {
    setFormData({
      ...formData,
      expenses: formData.expenses?.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(driver.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Mise à jour des revenus</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Semaine du</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.week}
              onChange={(e) => setFormData({ ...formData, week: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Revenus Uber</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.uberRevenue}
              onChange={(e) => setFormData({ ...formData, uberRevenue: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Revenus Bolt</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.boltRevenue}
              onChange={(e) => setFormData({ ...formData, boltRevenue: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Revenus en espèces</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.cashRevenue}
              onChange={(e) => setFormData({ ...formData, cashRevenue: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location véhicule</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.rentalFee}
              onChange={(e) => setFormData({ ...formData, rentalFee: Number(e.target.value) })}
            />
          </div>

          {/* Section des dépenses exceptionnelles */}
          <div className="mt-8 border-t pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Dépenses exceptionnelles</h4>
            
            <div className="space-y-4">
              {formData.expenses?.map((expense, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.amount}€ - {expense.date}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExpense(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Montant"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={newExpense.amount || ''}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                />
                <input
                  type="text"
                  placeholder="Description (ex: Réparation freins)"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
                <button
                  type="button"
                  onClick={addExpense}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Ajouter une dépense
                </button>
              </div>
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
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDriverData; 