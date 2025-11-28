import React, { useState } from 'react';
import Header from './components/Header';
import IncentiveCard from './components/IncentiveCard';
import ReferralForm from './components/ReferralForm';
import SuccessScreen from './components/SuccessScreen';
import VirtualAssistant from './components/VirtualAssistant';
import { INCENTIVE_DATA } from './constants';

const App: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-md mx-auto px-4 py-8">
        
        {/* Intro Text */}
        {!isSuccess && (
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-800">¡Bienvenido!</h2>
            <p className="text-slate-600 mt-2">
              Gracias por elegir nuestro transporte asociado. Tienes un beneficio exclusivo esperándote.
            </p>
          </div>
        )}

        {/* Dynamic Content */}
        {isSuccess ? (
          <SuccessScreen />
        ) : (
          <>
            <IncentiveCard data={INCENTIVE_DATA} />
            <ReferralForm onSuccess={() => setIsSuccess(true)} />
          </>
        )}

        {/* Benefits List (SEO/Trust) */}
        {!isSuccess && (
          <div className="mt-8 space-y-4">
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide border-b border-slate-200 pb-2">
              ¿Por qué elegirnos?
            </h4>
            <ul className="space-y-3">
              {[
                "Tecnología sin dolor de última generación",
                "Doctores certificados con +10 años de experiencia",
                "Horarios flexibles y ubicación céntrica"
              ].map((item, i) => (
                <li key={i} className="flex items-start text-sm text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="text-center text-slate-400 text-xs px-4">
          <p>© {new Date().getFullYear()} Clínica Dental ProSonrisa.</p>
          <p className="mt-1">Promoción válida solo con referencia de unidad autorizada.</p>
        </div>
      </footer>

      {/* AI Assistant - Always available */}
      <VirtualAssistant />
    </div>
  );
};

export default App;