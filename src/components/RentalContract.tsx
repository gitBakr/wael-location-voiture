type EmploymentStatus = 'fulltime' | 'parttime' | 'selfemployed';

interface RentalContractProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    startWeek: string;
    numberOfWeeks: number;
    employmentStatus: EmploymentStatus;
  };
  carName: string;
  priceDetails: {
    basePrice: number;
    employmentFee: number;
    tax: number;
    insurance: number;
    total: number;
  };
}

const RentalContract = ({ formData, carName, priceDetails }: RentalContractProps) => {
  const employmentStatusText: Record<EmploymentStatus, string> = {
    fulltime: 'Plein temps',
    parttime: 'Mi-temps',
    selfemployed: 'À son compte'
  };

  // Calculs arrondis
  const weeklyRental = 400;
  const professionalFees = 115;
  const vat = Math.round(weeklyRental * 0.2);
  const insurance = Math.round(weeklyRental * 0.1);
  const total = Math.round(weeklyRental + professionalFees + vat + insurance);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Récapitulatif - {carName}</h2>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Voir le contrat complet
        </button>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between">
          <span>Location hebdomadaire</span>
          <span>{weeklyRental}€</span>
        </div>
        <div className="flex justify-between">
          <span>Frais professionnels</span>
          <span>{professionalFees}€</span>
        </div>
        <div className="flex justify-between">
          <span>TVA (20%)</span>
          <span>{vat}€</span>
        </div>
        <div className="flex justify-between">
          <span>Assurance</span>
          <span>{insurance}€</span>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{total}€</span>
          </div>
        </div>
      </div>

      <div className="print-only">
        <h1 className="text-2xl font-bold mb-6">Contrat de Location - {carName}</h1>
        <div className="text-sm text-gray-600 space-y-4">
          <p>Entre les soussignés :</p>
          
          <div className="pl-4">
            <p><strong>Le loueur :</strong> VTC Location</p>
            <p>123 rue de Paris, 75000 Paris</p>
            <p>SIRET : XXXXXXXXX</p>
          </div>

          <p>Et</p>

          <div className="pl-4">
            <p><strong>Le locataire :</strong></p>
            <p>{formData.firstName} {formData.lastName}</p>
            <p>Tél : {formData.phone}</p>
            <p>Email : {formData.email}</p>
            <p>Statut professionnel : {employmentStatusText[formData.employmentStatus]}</p>
          </div>

          <div className="border-t pt-4 mt-4">
            <p><strong>Détails de la location :</strong></p>
            <ul className="pl-4 space-y-2">
              <li>Véhicule : {carName}</li>
              <li>Début de location : {formData.startWeek}</li>
              <li>Durée : {formData.numberOfWeeks} semaine(s)</li>
            </ul>
          </div>

          <div className="border-t pt-4 mt-4">
            <p><strong>Conditions financières :</strong></p>
            <ul className="pl-4 space-y-2">
              <li>Location hebdomadaire : {priceDetails.basePrice}€</li>
              {priceDetails.employmentFee > 0 && (
                <li>Frais professionnels : {priceDetails.employmentFee}€</li>
              )}
              <li>TVA (20%) : {priceDetails.tax}€</li>
              <li>Assurance : {priceDetails.insurance}€</li>
              <li className="font-semibold">Total : {priceDetails.total}€</li>
            </ul>
          </div>

          <div className="border-t pt-4 mt-4">
            <p><strong>Conditions générales :</strong></p>
            <ul className="pl-4 space-y-2">
              <li>Une caution de 1000€ sera demandée à la remise des clés</li>
              <li>Le véhicule doit être utilisé exclusivement pour une activité VTC</li>
              <li>L'entretien régulier est à la charge du locataire</li>
              <li>Le carburant est à la charge du locataire</li>
              <li>Kilométrage illimité</li>
            </ul>
          </div>

          <div className="border-t pt-4 mt-4">
            <p>Fait à Paris, le {new Date().toLocaleDateString('fr-FR')}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p>Le loueur</p>
                <p>VTC Location</p>
              </div>
              <div>
                <p>Le locataire</p>
                <p>{formData.firstName} {formData.lastName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalContract; 