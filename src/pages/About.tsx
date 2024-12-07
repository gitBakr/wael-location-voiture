import React from 'react';

const About = () => {
  const values = [
    {
      title: "Excellence",
      description: "Nous nous engageons à fournir les meilleurs véhicules et services à nos clients.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "Nous adoptons les dernières technologies pour améliorer l'expérience de location.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Responsabilité",
      description: "Nous nous engageons pour une mobilité durable et respectueuse de l'environnement.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    }
  ];

  const stats = [
    { number: "10+", label: "Années d'expérience" },
    { number: "1000+", label: "Clients satisfaits" },
    { number: "100+", label: "Véhicules disponibles" },
    { number: "5", label: "Agences en France" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">À Propos de Nous</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez l'histoire de notre entreprise et notre engagement envers l'excellence dans la location de voitures.
          </p>
        </div>

        {/* Notre Histoire */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notre Histoire</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Fondée en 2010, notre entreprise de location de voitures s'est construite sur une vision simple : rendre la location de véhicules aussi simple et agréable que possible.
              </p>
              <p className="mb-4">
                Au fil des années, nous avons développé notre flotte et nos services pour répondre aux besoins croissants de nos clients, tout en maintenant notre engagement envers la qualité et le service personnalisé.
              </p>
              <p>
                Aujourd'hui, nous sommes fiers d'être l'un des leaders de la location de voitures en France, avec une présence dans les principales villes du pays.
              </p>
            </div>
          </div>
        </div>

        {/* Nos Valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center transform transition duration-500 hover:scale-105">
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="bg-primary-600 rounded-lg shadow-lg p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Notre Engagement */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notre Engagement</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Qualité de Service</h3>
                  <p className="mt-2 text-gray-600">
                    Nous nous engageons à fournir un service de haute qualité à chaque étape de votre expérience de location.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Rapidité et Efficacité</h3>
                  <p className="mt-2 text-gray-600">
                    Notre processus de réservation simplifié vous permet de louer un véhicule rapidement et sans tracas.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Service Client Dédié</h3>
                  <p className="mt-2 text-gray-600">
                    Notre équipe de support est disponible 24/7 pour répondre à vos questions et vous assister en cas de besoin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
