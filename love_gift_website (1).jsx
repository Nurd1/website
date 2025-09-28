import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [page, setPage] = useState(0);

  const pages = [
    { label: "Start", content: <h1 className="text-3xl font-bold mt-4">Mihaela?</h1> },
    { label: "Rain", content: <h1 className="text-4xl font-bold text-blue-700 mb-2 drop-shadow-lg">Zilele Ploioase 🌧</h1> },
    { label: "Hearts", content: <h1 className="text-4xl font-bold text-red-600 mb-2 drop-shadow-md">Te Iubesc ❤</h1> },
    { label: "Sun", content: <h1 className="text-5xl font-bold text-yellow-600 mb-2 drop-shadow-md">Soare ☀️</h1> },
    { label: "Sunset", content: <h1 className="text-5xl font-bold text-orange-700 mb-2 drop-shadow-lg">Apus 🌇</h1> },
  ];

  const totalPages = pages.length;

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  const BottomNav = () => (
    <motion.div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-6 z-50">
      {pages.map((p, i) => (
        <motion.button
          key={i}
          onClick={() => setPage(i)}
          className={`min-w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xs font-semibold transition-all duration-300 overflow-hidden relative px-2 text-center leading-tight ${
            page === i ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page === i ? p.label : "•"}
        </motion.button>
      ))}
    </motion.div>
  );

  const RainBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-0.5 h-10 bg-blue-400 opacity-50"
          initial={{ y: -100, x: Math.random() * window.innerWidth }}
          animate={{ y: window.innerHeight + 100 }}
          transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );

  const HeartsBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500 text-2xl"
          style={{ left: Math.random() * 100 + "%" }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: window.innerHeight + 50, opacity: 1 }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "linear" }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );

  const SunBackground = () => (
    <motion.div className="absolute w-96 h-96 rounded-full bg-yellow-300 opacity-50" initial={{ scale: 0.9, opacity: 0.4 }} animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
  );

  const SunsetBackground = () => (
    <motion.div className="absolute inset-0 bg-gradient-to-t from-purple-800 via-pink-500 to-orange-400 opacity-60" initial={{ opacity: 0 }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
  );

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center relative overflow-hidden">
      {/* Side navigation buttons */}
      {page > 0 && (
        <div className="absolute inset-y-0 left-0 flex items-center z-50">
          <button onClick={prevPage} className="ml-4 bg-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition">
            ◀
          </button>
        </div>
      )}
      {page < totalPages - 1 && (
        <div className="absolute inset-y-0 right-0 flex items-center z-50">
          <button onClick={nextPage} className="mr-4 bg-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition">
            ▶
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {page === 0 && (
          <motion.div key="page1" className="flex flex-col items-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
            <motion.div className="text-red-500 text-8xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>❤</motion.div>
            {pages[0].content}
            <h2 className="text-lg font-medium text-gray-700 mt-2">Nu stiu cum sa incep sincer ce vreau sa-ti prezint. E doar o mica colectie din gandurile mele fata de noi.</h2>
            <p className="text-base text-gray-600 mt-4 max-w-xl text-center"></p>
            <button onClick={() => setPage(1)} className="mt-6 px-6 py-2 bg-red-500 text-white rounded-2xl shadow-lg hover:bg-red-600 transition">Ok?</button>
          </motion.div>
        )}

        {page === 1 && (
          <motion.div key="page2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="w-full min-h-screen bg-gradient-to-b from-blue-300 to-blue-50 p-6 overflow-y-auto flex flex-col items-center relative">
            <RainBackground />
            {pages[1].content}
            <h2 className="text-lg font-medium text-blue-900">In momentele noastre grele, tot cu tine vreau sa le petrec.</h2>
            <p className="text-base text-gray-700 mt-4 max-w-xl text-center relative z-10">Stiu ca nu am capacitatea necesara mereu sa-mi exprim sentimentele cum ar trebui, si poate mai des decat as vrea ma exprim gresit si avem mici rupturi. Vreau sa stii totusi ca mereu ma gandesc la tine, si vreau sa faci parte din viata mea.</p>
            <img src="/rain.jpg" alt="Rain" className="mt-6 w-64 h-auto rounded-lg shadow-lg relative z-10" />
          </motion.div>
        )}

        {page === 2 && (
          <motion.div key="page3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="w-full min-h-screen bg-gradient-to-b from-pink-300 to-pink-100 p-6 overflow-y-auto relative flex flex-col items-center">
            <HeartsBackground />
            {pages[2].content}
            <h2 className="text-lg font-medium text-red-700">Mai mult decat as putea doar sa-ti zic</h2>
            <p className="text-base text-gray-700 mt-4 max-w-xl text-center relative z-10">De când am început să fim împreună și să trăim momentele noastre, am știut că sentimentele mele pentru tine sunt extrem de puternice. Doar să-ți spun simplu „Te iubesc” ar fi prea puțin pentru a exprima cât de mult îmi doresc să fii parte din viața mea.</p>
            <img src="/hearts.jpg" alt="Hearts" className="mt-6 w-64 h-auto rounded-lg shadow-lg relative z-10" />
          </motion.div>
        )}

        {page === 3 && (
          <motion.div key="page4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="w-full min-h-screen bg-yellow-100 flex flex-col items-center justify-center relative">
            <SunBackground />
            {pages[3].content}
            <h2 className="text-lg font-medium text-yellow-800">Esti soarele meu</h2>
            <p className="text-base text-gray-700 mt-4 max-w-xl text-center relative z-10">Fiecare dimineata cu tine imi incalzeste inima. De la chestii simple precum ar fi sa spal vasele, tu sa gatesti, sau sa facem curat impreuna. Toate momentele pe care le impartasim imi lumineaza zilele si ma fac sa vreau sa fiu mai mult pentru tine. Sa te ajut, sa lucram impreuna.</p>
            <img src="/sun.jpg" alt="Sun" className="mt-6 w-64 h-auto rounded-lg shadow-lg relative z-10" />
          </motion.div>
        )}

        {page === 4 && (
          <motion.div key="page5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="w-full min-h-screen flex flex-col items-center justify-center relative">
            <SunsetBackground />
            {pages[4].content}
            <h2 className="text-lg font-medium text-orange-800">Sfarsitul zilei</h2>
            <p className="text-base text-gray-700 mt-4 max-w-xl text-center relative z-10">Imi place ca atunci cand ne incheiem ziua, si daca facem chestii impreuna si daca doar suntem prezenti in spatiul nostru nu ma simt separat de tine. Sunt cel mai fericit cand te regasesc in acelasi pat cu mine.</p>
            <img src="/sunset.jpg" alt="Sunset" className="mt-6 w-64 h-auto rounded-lg shadow-lg relative z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
