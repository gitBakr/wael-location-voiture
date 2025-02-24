export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  status: DriverStatus;
  rentalInfo: RentalInfo;
  weeklyData: WeeklyData[];
}

export interface WeeklyData {
  week: string;
  uberRevenue: number;
  boltRevenue: number;
  cashRevenue: number;
  rentalFee: number;
  expenses?: Array<{
    description: string;
    amount: number;
    date: string;
  }>;
}

export interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  siret: string;
  rcs: string;
  tva: string;
  bank?: string;
  iban?: string;
  bic?: string;
}

export type EmploymentStatus = 'fulltime' | 'parttime' | 'selfemployed';

export interface RentalInfo {
  carName: string;
  startWeek: string;
  numberOfWeeks: number;
  employmentStatus: EmploymentStatus;
  basePrice: number;
  employmentFee: number;
  employerFee: number;
  totalPrice: number;
  acceptContract: boolean;
  tax: number;
  insurance: number;
  total: number;
  contractDate: string;
  deposit: number;
}

export type DriverStatus = 'active' | 'inactive' | 'pending'; 