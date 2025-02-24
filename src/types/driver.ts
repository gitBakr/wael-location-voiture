export interface WeeklyData {
  week: string;
  uberRevenue: number;
  boltRevenue: number;
  cashRevenue: number;
  rentalFee: number;
}

export interface Driver {
  id: string;
  name: string;
  photo: string;
  phone: string;
  carAssigned: string;
  weeklyData: WeeklyData[];
} 