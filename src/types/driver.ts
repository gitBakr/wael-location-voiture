export interface WeeklyData {
  week: string;
  uberRevenue: number;
  boltRevenue: number;
  cashRevenue: number;
  rentalFee: number;
  expenses?: {
    amount: number;
    description: string;
    date: string;
  }[];
}

export type EmploymentStatus = 'fulltime' | 'parttime' | 'selfemployed';

export interface RentalInfo {
  startWeek: string;
  numberOfWeeks: number;
  employmentStatus: EmploymentStatus;
  basePrice: number;
  employmentFee: number;
  tax: number;
  insurance: number;
  total: number;
  contractDate: string;
  deposit: number;
  carName: string;
}

export type DriverStatus = 'pending' | 'active' | 'inactive';

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