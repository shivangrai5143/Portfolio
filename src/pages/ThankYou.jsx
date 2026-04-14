import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const ThankYou = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-10 text-center border border-gray-100 dark:border-slate-700 animate-fade-in-up">
        <div className="text-6xl mb-6">🚀</div>
        <h1 className="text-4xl font-bold mb-4 font-heading text-gray-900 dark:text-white">
          Thank You!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-sans">
          Your message has been successfully sent. I'll get back to you as soon as possible.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 shadow-lg font-sans mx-auto"
        >
          <FaArrowLeft />
          Back to Portfolio
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
