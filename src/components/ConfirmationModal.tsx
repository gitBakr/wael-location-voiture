interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal = ({ isOpen, onClose }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-md w-full p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Demande reçue avec succès !
          </h3>
          
          <p className="text-sm text-gray-500 mb-6">
            Notre équipe va étudier votre demande et reviendra vers vous dans les plus brefs délais.
            Un email de confirmation vous a été envoyé.
          </p>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 