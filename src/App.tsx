import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [stage, setStage] = useState<'idle' | 'flash' | 'done'>('idle');

  const triggerFlash = () => {
    setStage('flash');
    
    // The neuralyzer flash from Men in Black is actually a bright, intense RED flash
    // Let it flash for about 1 second, then show the 'done' state
    setTimeout(() => {
      setStage('done');
    }, 1200);

    // Reset back to idle after a few seconds so it can be used again
    setTimeout(() => {
      setStage('idle');
    }, 5000);
  };

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Red Flash Overlay */}
      <AnimatePresence>
        {stage === 'flash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, times: [0, 0.1, 0.8, 1], ease: "easeInOut" }}
            className="absolute inset-0 bg-red-600 z-50 mix-blend-screen pointer-events-none"
            style={{ boxShadow: "inset 0 0 150px white" }}
          >
            <div className="absolute inset-0 bg-white opacity-80 mix-blend-overlay"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        
        {stage === 'idle' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="text-4xl font-bold tracking-tight text-white mb-2">
              Neuralyzer <span className="text-red-500">v1.0</span>
            </div>
            
            {/* Minimal CSS representation of the neuralyzer cylinder */}
            <div className="relative w-16 h-48 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 rounded-t-xl rounded-b-md shadow-2xl border border-gray-500 flex flex-col items-center justify-start pt-4 cursor-pointer hover:scale-105 transition-transform" onClick={triggerFlash}>
               {/* The red flash bulb area */}
               <div className="w-12 h-8 bg-red-900/40 border-2 border-gray-300 rounded-sm mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent"></div>
               </div>
               {/* Detail lines */}
               <div className="w-14 h-1 bg-gray-800 mb-2"></div>
               <div className="w-14 h-1 bg-gray-800 mb-2"></div>
               <div className="w-14 h-1 bg-gray-800 mb-4"></div>
               {/* The button */}
               <div className="w-6 h-6 rounded-full bg-red-600 shadow-[0_0_10px_red] border-2 border-red-800"></div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-300">
                Wanna un-see it? Un-hear it?
              </h2>
              <button 
                onClick={triggerFlash}
                className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all transform hover:scale-105 active:scale-95 text-lg w-full"
              >
                Press Here
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'done' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-4">Done.</h1>
            <p className="text-2xl text-gray-400 font-medium">It never happened.</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default App;
