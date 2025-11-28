import React from 'react';

const SuccessScreen: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-8 text-center animate-fade-in-up">
      <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Solicitud Recibida!</h2>
      <p className="text-slate-600 mb-6">
        Hemos registrado tus datos correctamente. Nuestro equipo te llamará en breve para confirmar tu cita y aplicar tu descuento de <strong>$300 MXN</strong>.
      </p>
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 inline-block w-full">
        <p className="text-sm text-slate-500 mb-1">Precio Final a Pagar:</p>
        <p className="text-3xl font-bold text-teal-600">$600 MXN</p>
      </div>
      <p className="text-xs text-slate-400 mt-6">
        Puedes cerrar esta ventana.
      </p>
    </div>
  );
};

export default SuccessScreen;