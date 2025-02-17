import { FaPhone, FaWhatsapp } from 'react-icons/fa';

const FloatingButtons = () => {
  const phoneNumber = "33783090815"; // Format international sans le +
  
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* Bouton Téléphone */}
      <a
        href={`tel:+${phoneNumber}`}
        className="bg-primary-600 hover:bg-primary-700 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="Appeler"
      >
        <FaPhone className="text-2xl" />
      </a>
      
      {/* Bouton WhatsApp */}
      <a
        href={`https://wa.me/${phoneNumber}?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20la%20location%20de%20véhicules`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#128C7E] text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
};

export default FloatingButtons;
