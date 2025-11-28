import React, { useState, useEffect } from 'react';
import { submitReferral } from '../services/referralService';
import { ReferralData } from '../types';

interface Props {
  onSuccess: () => void;
}

const ReferralForm: React.FC<Props> = ({ onSuccess }) => {
  const [driverId, setDriverId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract Driver ID from URL Query Params or Hash
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('driverId') || params.get('id');
    
    // Simulate finding an ID if none provided (for demo purposes if opened directly)
    if (idFromUrl) {
      setDriverId(idFromUrl);
    } else {
        // Fallback for development/testing without query param
        console.log("No driverId found in URL, defaulting empty.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!clientName || !clientPhone) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }
    
    // Basic phone validation (digits only, length check)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(clientPhone.replace(/\D/g, ''))) {
       setError('Por favor ingresa un número de teléfono válido de 10 dígitos.');
       return;
    }

    // If no driver ID found, we can either block or set a default "Unknown/Walk-in"
    const finalDriverId = driverId || 'SIN_ID';

    setIsSubmitting(true);

    const data: ReferralData = {
      driverId: finalDriverId,
      clientName,
      clientPhone,
      timestamp: new Date().toISOString()
    };

    const success = await submitReferral(data);

    if (success) {
      onSuccess();
    } else {
      // In a real scenario with no-cors, we might not know it failed unless network error
      // But if we catch an error in service, we show this.
      setError('Hubo un problema al enviar tus datos. Por favor intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">¡Reserva tu Descuento!</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Driver ID Field - Read Only if present */}
        <div>
           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
             Código de Taxi (Referido por)
           </label>
           <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.567-4.167a6 6 0 005.698 8.581c1.55 0 3.043-.36 4.363-1" />
               </svg>
             </div>
             <input
               type="text"
               value={driverId}
               onChange={(e) => setDriverId(e.target.value)}
               readOnly={!!driverId} // Read only if extracted from URL
               placeholder="ID del Taxista"
               className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 ${driverId ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white border-slate-300'}`}
             />
           </div>
           {!driverId && <p className="text-xs text-orange-500 mt-1">* Ingrese el ID manualmente si no se cargó.</p>}
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Tu nombre"
            className="block w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
          />
        </div>

        {/* Client Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder="55 1234 5678"
            className="block w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md transition duration-200 flex justify-center items-center ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 active:scale-95'}`}
        >
          {isSubmitting ? (
             <>
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Enviando...
             </>
          ) : (
            'SOLICITAR DESCUENTO'
          )}
        </button>
        
        <p className="text-xs text-center text-slate-400 mt-2">
          Al enviar, aceptas ser contactado para agendar tu cita.
        </p>
      </form>
    </div>
  );
};

export default ReferralForm;