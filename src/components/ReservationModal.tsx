import { useState } from 'react';
import { format, addWeeks, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  pricePerDay: number;
}

const ReservationModal = ({ isOpen, onClose, carName, pricePerDay }: ReservationModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employmentStatus: '',
    weeks: 1 // Durée en semaines
  });

  if (!isOpen) return null;

  const weeks = Array.from({ length: 4 }).map((_, index) => {
    const weekStart = startOfWeek(addWeeks(new Date(), index + 1));
    return {
      value: format(weekStart, 'yyyy-MM-dd'),
      label: `Semaine du ${format(weekStart, 'dd MMMM yyyy', { locale: fr })}`
    };
  });

  const hours = Array.from({ length: 8 }).map((_, index) => {
    const hour = 9 + index;
    return `${hour}:00`;
  });

  const employmentOptions = [
    { value: 'fulltime', label: 'Plein temps' },
    { value: 'parttime', label: 'Mi-temps' },
    { value: 'selfemployed', label: 'À mon compte' }
  ];

  const calculateTotal = () => {
    const daysPerWeek = 7;
    const basePrice = pricePerDay * (formData.weeks * daysPerWeek);
    
    // Frais supplémentaires selon la situation professionnelle
    let employmentFee = 0;
    if (formData.employmentStatus === 'fulltime') {
      employmentFee = 120 * formData.weeks; // 120€ par semaine pour plein temps
    } else if (formData.employmentStatus === 'parttime') {
      employmentFee = 50 * formData.weeks; // 50€ par semaine pour mi-temps
    }

    const tax = basePrice * 0.20; // TVA 20%
    const insurance = basePrice * 0.10; // Assurance 10%
    
    return {
      basePrice,
      employmentFee,
      tax,
      insurance,
      total: basePrice + employmentFee + tax + insurance
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWeeksChange = (newWeeks: number) => {
    if (newWeeks >= 1 && newWeeks <= 4) {
      setFormData({
        ...formData,
        weeks: newWeeks
      });
    }
  };

  const handleSubmit = () => {
    setStep(5);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= stepNumber ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div className={`w-12 h-1 mx-1 ${
                step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const priceDetails = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {step === 5 ? 'Confirmation' : `Réserver ${carName}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step < 5 && renderStepIndicator()}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionnez une semaine
              </label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="w-full p-2 border-2 border-gray-200 rounded-md focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
              >
                <option value="">Choisir une semaine</option>
                {weeks.map((week) => (
                  <option key={week.value} value={week.value}>
                    {week.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionnez une heure
              </label>
              <div className="grid grid-cols-4 gap-2">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => setSelectedHour(hour)}
                    className={`p-2 text-sm rounded-md border-2 transition-colors ${
                      selectedHour === hour
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => selectedWeek && selectedHour && setStep(2)}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
              disabled={!selectedWeek || !selectedHour}
            >
              Continuer
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-200 rounded-md focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-200 rounded-md focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-200 rounded-md focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-200 rounded-md focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Situation professionnelle
              </label>
              <div className="space-y-3">
                {employmentOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-3 border-2 border-gray-200 rounded-md hover:border-primary-300 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="employmentStatus"
                      value={option.value}
                      checked={formData.employmentStatus === option.value}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 border-2 border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <span className="ml-3">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
                disabled={!formData.employmentStatus}
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Durée de location</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => handleWeeksChange(formData.weeks - 1)}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 transition-colors disabled:opacity-50 disabled:hover:border-gray-200"
                  disabled={formData.weeks <= 1}
                >
                  <span className="text-xl">-</span>
                </button>
                <span className="text-xl font-medium w-24 text-center">
                  {formData.weeks} {formData.weeks > 1 ? 'semaines' : 'semaine'}
                </span>
                <button
                  onClick={() => handleWeeksChange(formData.weeks + 1)}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 transition-colors disabled:opacity-50 disabled:hover:border-gray-200"
                  disabled={formData.weeks >= 4}
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                ({formData.weeks * 7} jours au total)
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4 space-y-3">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Détails du prix</h3>
              <div className="flex justify-between">
                <span className="text-gray-600">Prix de base ({formData.weeks * 7} jours)</span>
                <span className="font-medium">{priceDetails.basePrice.toFixed(2)}€</span>
              </div>
              {priceDetails.employmentFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Frais {formData.employmentStatus === 'fulltime' ? 'plein temps' : 'mi-temps'}
                    {' '}({formData.weeks} {formData.weeks > 1 ? 'semaines' : 'semaine'})
                  </span>
                  <span className="font-medium">{priceDetails.employmentFee.toFixed(2)}€</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">TVA (20%)</span>
                <span className="font-medium">{priceDetails.tax.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Assurance (10%)</span>
                <span className="font-medium">{priceDetails.insurance.toFixed(2)}€</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-2 mt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary-600">{priceDetails.total.toFixed(2)}€</span>
                </div>
                <p className="text-sm text-gray-500 text-right mt-1">
                  Soit {(priceDetails.total / (formData.weeks * 7)).toFixed(2)}€/jour
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Retour
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
              >
                Confirmer la réservation
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Réservation confirmée !
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Merci {formData.firstName} pour votre réservation de {carName} pour {formData.weeks} {formData.weeks > 1 ? 'semaines' : 'semaine'}.
                <br />
                Montant total : {priceDetails.total.toFixed(2)}€
                <br />
                Vous recevrez bientôt un email de confirmation à l'adresse {formData.email}.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
