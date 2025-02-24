import { format, addDays } from 'date-fns';

interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  siret: string;
  rcs: string;
  tva: string;
  logo?: string;
  bank?: string;
  iban?: string;
  bic?: string;
}

interface ClientInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  siret?: string;
  tva?: string;
}

interface VehicleInfo {
  name: string;
  registration?: string;
  mileage?: number;
}

interface PriceDetails {
  basePrice: number;
  professionalFees?: number;
  tax: number;
  insurance: number;
  total: number;
  additionalFees?: Array<{description: string; amount: number}>;
}

interface ProfessionalDocumentProps {
  type: 'invoice' | 'quote';
  documentNumber: string;
  date: Date;
  startDate?: Date;
  endDate?: Date;
  company: CompanyInfo;
  client: ClientInfo;
  vehicle: VehicleInfo;
  prices: PriceDetails;
  paymentTerms?: string;
}

const ProfessionalDocument = ({
  type,
  documentNumber,
  date,
  company,
  client,
  vehicle,
  prices,
}: ProfessionalDocumentProps) => {
  const totalHT = prices.total;
  const tva = totalHT * 0.2;
  const totalTTC = totalHT + tva;

  return `
*VTC LOCATION FRANCE*
Logiciel de facturation
---------------------------

Destinataire:
${client.firstName} ${client.lastName}
${client.address || ''}
SIRET: ${client.siret || 'N/A'}
N° de TVA: ${client.tva || 'N/A'}

Date de facturation: ${format(date, 'dd/MM/yyyy')}
Échéance: ${format(addDays(date, 14), 'dd/MM/yyyy')}

*${type === 'invoice' ? 'Facture' : 'Devis'} N° ${documentNumber}*

Désignation          Quantité          Prix          Total
----------------------------------------------------------
Location véhicule        1         ${prices.basePrice},00     ${prices.basePrice},00
${prices.additionalFees?.map(fee => 
  `${fee.description}        1         ${fee.amount},00     ${fee.amount},00`
).join('\n') || ''}

----------------------------------------------------------
Total: ${totalHT},00 €
TVA(20%): ${tva},00 €
Total TTC: ${totalTTC},00 €

Conditions de paiement: Paiement à réception de facture
TVA non applicable, art. 293 B du CGI

----------------------------------------------------------
${company.name}                     ${company.bank || 'Banque BNP'}
SIRET: ${company.siret}            ${company.iban || 'IBAN: FR76 XXXX XXXX'}
N° de TVA: ${company.tva}          ${company.bic || 'SWIFT/BIC: BNPAFRPP'}
Tél: ${company.phone}`;
};

export default ProfessionalDocument; 