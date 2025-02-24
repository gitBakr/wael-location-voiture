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

export interface RentalInfo {
  carName: string;
  startWeek: string;
}

export type DriverStatus = 'active' | 'inactive' | 'pending'; 