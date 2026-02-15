import { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

const Connect = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // ✅ Handle form submit with Formcarry integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await fetch('https://formcarry.com/s/nnNdnJnt4gg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (result.code === 200) {
          setIsSubmitted(true);
          setFormData({ name: '', email: '', message: '' }); // Clear the form

          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
          console.error('Submission failed:', result.message);
          alert('Sorry, there was an error sending your message.');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Sorry, there was a network error.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-4">
            Let's Connect
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>


        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <a
            href="mailto:raishivang69@gmail.com"
            className="flex items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-slate-700"
          >
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <FaEnvelope className="text-red-500 dark:text-red-400 text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">raishivang69@gmail.com</p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/shivang-rai-58b45728b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-slate-700"
          >
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <FaLinkedin className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">LinkedIn</h3>
              <p className="text-gray-600 dark:text-gray-400">Connect with me</p>
            </div>
          </a>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-6">Send a Message</h2>

          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3">
              <FaPaperPlane />
              <span>
                Thank you for your message! I'll get back to you as soon as possible.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                  }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                  }`}
                placeholder="Your message..."
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connect;