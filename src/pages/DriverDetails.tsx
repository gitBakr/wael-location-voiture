import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDrivers, updateDriver, updateDriverData } from '../utils/driverManager';
import { format, parseISO, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import EditDriverModal from '../components/EditDriverModal';
import UpdateDriverData from '../components/UpdateDriverData';
import { toast } from 'react-hot-toast';
import ProfessionalDocument from '../components/ProfessionalDocument';
import jsPDF from 'jspdf';
import { Driver, WeeklyData } from '../types';

const DriverDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdateDataModalOpen, setIsUpdateDataModalOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>([]);
  
  const driver = getDrivers().find(d => d.id === id);

  const handleUpdateDriver = (driverId: string, updatedData: Partial<Driver>) => {
    const updated = updateDriver(driverId, updatedData);
    if (updated) {
      // Rafraîchir les données
      window.location.reload();
    }
  };

  const handleUpdateData = (driverId: string, weekData: WeeklyData) => {
    const updated = updateDriverData(driverId, weekData);
    if (updated) {
      window.location.reload();
    }
  };

  const toggleWeekExpansion = (weekId: string) => {
    setExpandedWeeks(prev => 
      prev.includes(weekId) 
        ? prev.filter(id => id !== weekId)
        : [...prev, weekId]
    );
  };

  const sendWeeklyRecap = (week: WeeklyData, driver: Driver) => {
    const message = `
🚗 Récapitulatif semaine du ${format(parseISO(week.week), 'dd MMMM yyyy', { locale: fr })}

Bonjour ${driver.firstName},

Voici votre récapitulatif :

📈 Revenus :
- Uber : ${week.uberRevenue}€
- Bolt : ${week.boltRevenue}€
- Espèces : ${week.cashRevenue}€
- Total : ${week.uberRevenue + week.boltRevenue + week.cashRevenue}€

💰 Déductions :
- Location véhicule : ${week.rentalFee}€

💵 Montant à recevoir : ${week.uberRevenue + week.boltRevenue + week.cashRevenue - week.rentalFee}€

Merci de votre confiance !
VTC Location
`;

    const whatsappUrl = `https://wa.me/${driver.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Récapitulatif envoyé sur WhatsApp');
  };

  const sendInvoice = (week: WeeklyData, driver: Driver) => {
    const companyInfo: CompanyInfo = {
      name: 'VTC LOCATION FRANCE',
      address: '123 rue de Paris',
      city: '75000 Paris',
      phone: '01 23 45 67 89',
      email: 'contact@vtclocation.fr',
      siret: '123 456 789 00012',
      rcs: 'Paris B 123 456 789',
      tva: 'FR 12 345678900',
    };

    const message = ProfessionalDocument({
      type: 'invoice',
      documentNumber: `${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date(),
      startDate: parseISO(week.week),
      endDate: addDays(parseISO(week.week), 6),
      company: companyInfo,
      client: {
        firstName: driver.firstName,
        lastName: driver.lastName,
        phone: driver.phone,
        email: driver.email
      },
      vehicle: {
        name: driver.rentalInfo?.carName || '',
      },
      prices: {
        basePrice: week.rentalFee,
        tax: Math.round(week.rentalFee * 0.2),
        insurance: Math.round(week.rentalFee * 0.1),
        total: week.rentalFee + Math.round(week.rentalFee * 0.2),
        additionalFees: week.expenses
      }
    });

    const whatsappUrl = `https://wa.me/${driver.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Facture envoyée sur WhatsApp');
  };

  const downloadInvoice = (week: WeeklyData, driver: Driver) => {
    try {
      const doc = new jsPDF();
      
      // Configuration de la police et des marges
      doc.setFont('helvetica');
      doc.setFontSize(10);
      
      // En-tête
      doc.setFontSize(16);
      doc.text('VTC LOCATION FRANCE', 105, 20, { align: 'center' });
      doc.setFontSize(10);
      
      // Informations client
      doc.text(`Client: ${driver.firstName} ${driver.lastName}`, 20, 40);
      doc.text(`Tél: ${driver.phone}`, 20, 45);
      doc.text(`Email: ${driver.email}`, 20, 50);
      
      // Informations facture
      doc.text(`Facture N° ${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`, 20, 65);
      doc.text(`Date: ${format(new Date(), 'dd/MM/yyyy')}`, 20, 70);
      doc.text(`Période: Semaine du ${format(parseISO(week.week), 'dd/MM/yyyy')}`, 20, 75);
      
      // Tableau des prestations
      const startY = 90;
      doc.line(20, startY, 190, startY); // Ligne horizontale
      
      // En-têtes du tableau
      doc.text('Désignation', 20, startY + 5);
      doc.text('Prix', 150, startY + 5);
      doc.text('Total', 170, startY + 5);
      
      doc.line(20, startY + 10, 190, startY + 10);
      
      // Contenu du tableau
      doc.text('Location véhicule', 20, startY + 20);
      doc.text(`${week.rentalFee}€`, 150, startY + 20);
      doc.text(`${week.rentalFee}€`, 170, startY + 20);
      
      // Totaux
      const totalHT = week.rentalFee;
      const tva = Math.round(totalHT * 0.2);
      const totalTTC = totalHT + tva;
      
      const totalY = startY + 40;
      doc.line(20, totalY, 190, totalY);
      
      doc.text('Total HT:', 130, totalY + 10);
      doc.text(`${totalHT}€`, 170, totalY + 10);
      
      doc.text('TVA (20%):', 130, totalY + 20);
      doc.text(`${tva}€`, 170, totalY + 20);
      
      doc.text('Total TTC:', 130, totalY + 30);
      doc.setFontSize(12);
      doc.text(`${totalTTC}€`, 170, totalY + 30);
      
      // Pied de page
      doc.setFontSize(8);
      const footerY = 270;
      doc.text('VTC LOCATION FRANCE - SIRET: 123 456 789 00012', 105, footerY, { align: 'center' });
      doc.text('123 rue de Paris, 75000 Paris - Tél: 01 23 45 67 89', 105, footerY + 5, { align: 'center' });
      
      // Sauvegarde du PDF
      doc.save(`facture_${driver.firstName}_${driver.lastName}_${format(parseISO(week.week), 'dd-MM-yyyy')}.pdf`);
      toast.success('Facture téléchargée');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      toast.error('Erreur lors de la génération du PDF');
    }
  };

  if (!driver) {
    return <div>Chauffeur non trouvé</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      {/* En-tête avec bouton retour */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <button
          onClick={() => navigate('/accounting')}
          className="flex items-center text-primary-600 hover:text-primary-700"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à la liste
        </button>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Modifier les informations
        </button>
      </div>

      {/* Profil du chauffeur */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={driver.photo || '/default-avatar.png'}
            alt={`${driver.firstName} ${driver.lastName}`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {driver.firstName} {driver.lastName}
            </h1>
            <p className="text-gray-500">{driver.rentalInfo?.carName || 'Pas de véhicule assigné'}</p>
            <p className="text-gray-500">{driver.phone}</p>
            {driver.rentalInfo?.startWeek && (
              <p className="text-gray-500">
                Date d'entrée : {format(parseISO(driver.rentalInfo.startWeek), 'dd MMMM yyyy', { locale: fr })}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Données hebdomadaires */}
      <div className="space-y-4 sm:space-y-6">
        {driver.weeklyData.map((week, index) => (
          <div key={`${week.week}-${index}`} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Semaine du {format(parseISO(week.week), 'dd MMMM yyyy', { locale: fr })}
              </h2>
              <button
                onClick={() => toggleWeekExpansion(week.week)}
                className="text-primary-600 hover:text-primary-700"
              >
                {expandedWeeks.includes(week.week) ? 'Voir moins' : 'Voir détails'}
              </button>
            </div>

            {expandedWeeks.includes(week.week) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Total revenus: <span className="font-semibold text-green-600">{week.uberRevenue + week.boltRevenue + week.cashRevenue}€</span></p>
                  <p className="text-gray-600">Location: <span className="font-semibold text-red-600">{Math.round(week.rentalFee)}€</span></p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">À verser: <span className="font-semibold text-primary-600">
                    {Math.round(week.uberRevenue + week.boltRevenue + week.cashRevenue - week.rentalFee)}€
                  </span></p>
                </div>
              </div>
            )}

            {week.expenses && week.expenses.length > 0 && (
              <div className="bg-red-50 rounded-lg p-4 mt-4">
                <h3 className="text-lg font-medium text-red-800 mb-2">Dépenses exceptionnelles</h3>
                <div className="space-y-2">
                  {week.expenses.map((expense, index) => (
                    <div key={index} className="flex justify-between text-red-700">
                      <span>{expense.description}</span>
                      <span className="font-medium">-{expense.amount}€</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {expandedWeeks.includes(week.week) && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end mt-4">
                <button
                  onClick={() => sendWeeklyRecap(week, driver)}
                  className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  <span className="whitespace-nowrap">Envoyer récap</span>
                </button>
                
                <button
                  onClick={() => sendInvoice(week, driver)}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="whitespace-nowrap">Envoyer facture</span>
                </button>
                
                <button
                  onClick={() => downloadInvoice(week, driver)}
                  className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="whitespace-nowrap">Télécharger PDF</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <EditDriverModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        driver={driver}
        onUpdate={(driverId, data) => {
          updateDriver(driverId, data);
          // Rafraîchir les données
          window.location.reload();
        }}
        allowWeeklyData={true}
      />

      <UpdateDriverData
        isOpen={isUpdateDataModalOpen}
        onClose={() => setIsUpdateDataModalOpen(false)}
        driver={driver}
        onUpdate={handleUpdateData}
      />
    </div>
  );
};

export default DriverDetails; 