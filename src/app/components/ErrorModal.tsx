interface ErrorModalProps {
  onClose: () => void;
}

export function ErrorModal({ onClose }: ErrorModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-red-600">Error</h2>
        <p className="text-gray-700 mt-2">La ubicación no se encontró. Intenta con otra.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
