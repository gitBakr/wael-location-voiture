import { Driver, WeeklyData } from '../types/driver';


export const addDriver = (newDriver: Omit<Driver, 'id'>): Driver => {
  const drivers = getDrivers();
  const driver: Driver = {
    ...newDriver,
    id: Date.now().toString(),
    weeklyData: [] // Initialiser avec un tableau vide
  };
  drivers.push(driver);
  localStorage.setItem('drivers', JSON.stringify(drivers));
  return driver;
};

export const getDrivers = (): Driver[] => {
  const storedDrivers = localStorage.getItem('drivers');
  if (!storedDrivers) {
    localStorage.setItem('drivers', JSON.stringify([]));
    return [];
  }
  // Filtrer pour ne garder que les chauffeurs actifs et en attente
  const drivers = JSON.parse(storedDrivers);
  const filteredDrivers = drivers.filter(
    (driver: Driver) => driver.status === 'active' || driver.status === 'pending'
  );
  
  // Mettre à jour le localStorage avec les données filtrées
  localStorage.setItem('drivers', JSON.stringify(filteredDrivers));
  return filteredDrivers;
};

export const updateDriver = (driverId: string, updatedData: Partial<Driver>): boolean => {
  const drivers = getDrivers();
  const index = drivers.findIndex(d => d.id === driverId);
  if (index !== -1) {
    drivers[index] = { ...drivers[index], ...updatedData };
    localStorage.setItem('drivers', JSON.stringify(drivers));
    return true;
  }
  return false;
};

export const updateDriverData = (driverId: string, weekData: WeeklyData): Driver | null => {
  const driverIndex = getDrivers().findIndex(d => d.id === driverId);
  
  if (driverIndex === -1) return null;
  
  // Ajouter les nouvelles données en début de tableau
  const drivers = getDrivers();
  drivers[driverIndex].weeklyData.unshift(weekData);
  
  // Sauvegarder dans localStorage
  localStorage.setItem('drivers', JSON.stringify(drivers));
  
  return drivers[driverIndex];
}; 