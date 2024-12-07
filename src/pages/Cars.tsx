import { useState } from 'react';
import CarCard from '../components/CarCard';

const allCars = [
  {
    name: 'Mercedes Classe C',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    price: 120,
    category: 'Berline de luxe',
    seats: 5,
    transmission: 'Automatique'
  },
  {
    name: 'BMW Série 3',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    price: 110,
    category: 'Berline sportive',
    seats: 5,
    transmission: 'Automatique'
  },
  {
    name: 'Audi A4',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    price: 115,
    category: 'Berline premium',
    seats: 5,
    transmission: 'Automatique'
  },
  {
    name: 'Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    price: 130,
    category: 'Électrique',
    seats: 5,
    transmission: 'Automatique'
  },
  {
    name: 'Range Rover Evoque',
    image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    price: 150,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatique'
  },
  {
    name: 'Porsche 911',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    price: 200,
    category: 'Sport',
    seats: 2,
    transmission: 'Automatique'
  }
];

const categories = ['Toutes', 'Berline de luxe', 'Berline sportive', 'Berline premium', 'Électrique', 'SUV', 'Sport'];

const Cars = () => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [priceRange, setPriceRange] = useState(200);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = allCars.filter(car => {
    const matchesCategory = selectedCategory === 'Toutes' || car.category === selectedCategory;
    const matchesPrice = car.price <= priceRange;
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nos Véhicules</h1>
          <p className="mt-2 text-gray-600">Découvrez notre sélection de véhicules disponibles à la location</p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recherche */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <input
                type="text"
                id="search"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Rechercher un véhicule..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Catégories */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Prix */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Prix maximum par jour: {priceRange}€
              </label>
              <input
                type="range"
                id="price"
                min="50"
                max="200"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Liste des voitures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => (
            <CarCard key={index} {...car} />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun véhicule ne correspond à vos critères
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos filtres pour voir plus de résultats
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
