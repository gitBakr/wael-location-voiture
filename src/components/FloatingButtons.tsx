import { FaPhone, FaWhatsapp } from 'react-icons/fa';

const FloatingButtons = () => {
  const phoneNumber = "+216123456789"; // Remplacez par votre numéro de téléphone
  
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* Bouton Téléphone */}
      <a
        href={`tel:${phoneNumber}`}
        className="bg-[#FF4C4C] hover:bg-[#FF3333] text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="Appeler"
      >
        <FaPhone className="text-2xl" />
      </a>
      
      {/* Bouton WhatsApp */}
      <a
        href={`https://wa.me/${phoneNumber}`}
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
