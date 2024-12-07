import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Location courte durée",
      description: "Location flexible de 1 à 4 semaines pour vos besoins ponctuels.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Assurance tous risques",
      description: "Protection complète pour une conduite en toute sérénité.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Service de livraison",
      description: "Livraison et récupération du véhicule à l'adresse de votre choix.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const additionalServices = [
    {
      title: "GPS inclus",
      description: "Système de navigation GPS dernière génération inclus dans chaque véhicule."
    },
    {
      title: "Siège auto",
      description: "Sièges adaptés pour enfants disponibles sur demande."
    },
    {
      title: "Assistance routière",
      description: "Service d'assistance 24/7 en cas de panne ou d'accident."
    },
    {
      title: "Kilométrage illimité",
      description: "Aucune restriction de kilométrage sur nos locations."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services conçus pour rendre votre expérience de location simple et agréable.
          </p>
        </div>

        {/* Services principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comment ça marche */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choisissez</h3>
              <p className="text-gray-600 text-center">Sélectionnez le véhicule qui correspond à vos besoins</p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Réservez</h3>
              <p className="text-gray-600 text-center">Effectuez votre réservation en ligne en quelques clics</p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profitez</h3>
              <p className="text-gray-600 text-center">Récupérez votre véhicule et profitez de votre location</p>
            </div>
          </div>
        </div>

        {/* Services additionnels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {additionalServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
