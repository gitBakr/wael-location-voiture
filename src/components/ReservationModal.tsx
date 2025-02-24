import { useState } from 'react';
import { format, addWeeks, startOfWeek, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import ConfirmationModal from './ConfirmationModal';
import RentalContract from './RentalContract';
import { EmploymentStatus, DriverStatus } from '../types/driver';
import { addDriver } from '../utils/driverManager';
import { toast } from 'react-hot-toast';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  pricePerDay: number;
  carImage?: string;
}

const ReservationModal = ({ isOpen, onClose, carName, pricePerDay }: ReservationModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startWeek: '',
    numberOfWeeks: 1,
    employmentStatus: 'fulltime' as EmploymentStatus,
    acceptContract: false
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen) return null;

  // Générer les 4 prochaines semaines
  const weeks = Array.from({ length: 4 }).map((_, index) => {
    const weekStart = startOfWeek(addWeeks(new Date(), index + 1));
    return {
      value: format(weekStart, 'yyyy-MM-dd'),
      label: `Semaine du ${format(weekStart, 'dd MMMM yyyy', { locale: fr })}`
    };
  });

  const employmentOptions = [
    { value: 'fulltime', label: 'Plein temps' },
    { value: 'parttime', label: 'Mi-temps' },
    { value: 'selfemployed', label: 'À mon compte' }
  ];

  const handleWeeksChange = (newWeeks: number) => {
    if (newWeeks >= 1 && newWeeks <= 4) {
      setFormData({ ...formData, numberOfWeeks: newWeeks });
    }
  };

  const calculatePrices = (employmentStatus: EmploymentStatus, numberOfWeeks: number) => {
    const basePrice = 400; // Prix hebdomadaire fixe
    const employmentFee = employmentStatus === 'selfemployed' ? 0 : 115;
    const tax = Math.round(basePrice * 0.2); // TVA arrondie
    const insurance = Math.round(basePrice * 0.1); // Assurance arrondie
    const total = Math.round(basePrice + employmentFee + tax + insurance);

    return {
      basePrice,
      employmentFee,
      tax,
      insurance,
      total
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer un nouveau chauffeur avec les données du formulaire
    const newDriver = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      photo: 'https://randomuser.me/api/portraits/men/1.jpg', // Photo par défaut
      status: 'pending' as DriverStatus,
      rentalInfo: {
        startWeek: formData.startWeek,
        numberOfWeeks: formData.numberOfWeeks,
        employmentStatus: formData.employmentStatus,
        basePrice: priceDetails.basePrice,
        employmentFee: priceDetails.employmentFee,
        tax: priceDetails.tax,
        insurance: priceDetails.insurance,
        total: priceDetails.total,
        contractDate: new Date().toISOString().split('T')[0],
        deposit: 1000,
        carName: carName,
        employerFee: 0,
        totalPrice: priceDetails.total,
        acceptContract: false
      },
      weeklyData: []
    };

    // Ajouter le chauffeur
    addDriver(newDriver);
    
    setShowConfirmation(true);
  };

  const priceDetails = calculatePrices(formData.employmentStatus, formData.numberOfWeeks);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const generateQuote = () => {
    if (!formData.phone) {
      toast.error('Veuillez saisir votre numéro de téléphone');
      return;
    }

    // Formater le numéro de téléphone
    let phoneNumber = formData.phone.replace(/[^0-9]/g, '');
    if (phoneNumber.startsWith('0')) {
      phoneNumber = '33' + phoneNumber.substring(1);
    }
    if (!phoneNumber.startsWith('33')) {
      phoneNumber = '33' + phoneNumber;
    }

    const message = `
*VTC LOCATION FRANCE*
SIRET : 123 456 789 00012
123 rue de Paris, 75000 Paris
Tél : 01 23 45 67 89
Email : contact@vtclocation.fr
---------------------------

*DEVIS N°${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}*
Date : ${format(new Date(), 'dd/MM/yyyy')}

CLIENT
------
${formData.firstName} ${formData.lastName}
Tél : ${formData.phone}
Email : ${formData.email}

DÉTAILS DE LA PRESTATION
-----------------------
Véhicule : ${carName}
Durée : ${formData.numberOfWeeks} semaine(s)
Date de début : ${format(parseISO(formData.startWeek), 'dd/MM/yyyy')}

TARIFICATION HEBDOMADAIRE
-----------------------
Location véhicule : 400,00€
${formData.employmentStatus !== 'selfemployed' ? 'Frais professionnels : 115,00€\n' : ''}TVA (20%) : ${Math.round(400 * 0.2)},00€
Assurance : ${Math.round(400 * 0.1)},00€
---------------------------
*TOTAL HT : ${Math.round(priceDetails.total / 1.2)},00€*
*TVA 20% : ${Math.round(priceDetails.total * 0.2)},00€*
*TOTAL TTC : ${priceDetails.total},00€*

PRESTATIONS INCLUSES
------------------
✓ Kilométrage illimité
✓ Assurance tous risques
✓ Entretien régulier
✓ Assistance 24/7
✓ Service client dédié

Devis valable 7 jours
RCS Paris B 123 456 789
TVA Intracommunautaire : FR 12 345678900
`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Devis envoyé sur WhatsApp');
  };

  return (
    <>
      {/* Overlay avec gestion du clic */}
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
        onClick={handleBackdropClick}
      >
        <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl relative mx-2 sm:mx-4">
            {/* Bouton X pour fermer */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              {/* Grille responsive pour les informations personnelles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  required
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="rounded-md border-gray-300"
                />
                <input
                  type="text"
                  required
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="rounded-md border-gray-300"
                />
                <input
                  type="tel"
                  required
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-md border-gray-300"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-md border-gray-300"
                />
              </div>

              {/* Sélection de la semaine */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semaine de début
                </label>
                <select
                  required
                  className="w-full rounded-md border-gray-300"
                  value={formData.startWeek}
                  onChange={(e) => setFormData({ ...formData, startWeek: e.target.value })}
                >
                  <option value="">Sélectionnez une semaine</option>
                  {weeks.map((week) => (
                    <option key={week.value} value={week.value}>
                      {week.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nombre de semaines */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de semaines
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => handleWeeksChange(formData.numberOfWeeks - 1)}
                    className="px-3 py-1 border rounded-md hover:bg-gray-50"
                    disabled={formData.numberOfWeeks <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{formData.numberOfWeeks}</span>
                  <button
                    type="button"
                    onClick={() => handleWeeksChange(formData.numberOfWeeks + 1)}
                    className="px-3 py-1 border rounded-md hover:bg-gray-50"
                    disabled={formData.numberOfWeeks >= 4}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Situation professionnelle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Situation professionnelle
                </label>
                <select
                  required
                  className="w-full rounded-md border-gray-300"
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value as EmploymentStatus })}
                >
                  <option value="">Sélectionnez votre situation</option>
                  {employmentOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Récapitulatif des prix */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h4 className="font-medium mb-4">Récapitulatif - {carName}</h4>
                <div className="space-y-2">
                  <p>Location hebdomadaire : {priceDetails.basePrice}€</p>
                  {priceDetails.employmentFee > 0 && (
                    <p>Frais professionnels : {priceDetails.employmentFee}€</p>
                  )}
                  <p>TVA (20%) : {priceDetails.tax}€</p>
                  <p>Assurance : {priceDetails.insurance}€</p>
                  <p className="font-semibold">Total : {priceDetails.total}€</p>
                </div>
                <button
                  type="button"
                  onClick={generateQuote}
                  className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Recevoir un devis WhatsApp
                </button>
              </div>

              {/* Contrat avec hauteur max ajustable */}
              <div className="space-y-3 sm:space-y-4">
                <div className="border rounded-md p-3 sm:p-4 max-h-60 sm:max-h-96 overflow-y-auto">
                  <RentalContract
                    formData={formData}
                    carName={carName}
                    priceDetails={priceDetails}
                  />
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    checked={formData.acceptContract}
                    onChange={(e) => setFormData({ ...formData, acceptContract: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600"
                  />
                  <span className="ml-2 text-sm">J'accepte les conditions générales de location</span>
                </label>
              </div>

              {/* Boutons en colonne sur mobile */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Réserver maintenant
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          onClose();
        }}
      />
    </>
  );
};

export default ReservationModal;
