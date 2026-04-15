import { useState } from "react";

// Material Symbols Icon Component
function Icon({ name, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
    >
      {name}
    </span>
  );
}

function ContactCard({ icon, label, title, linkText, href, actionLink, linkIcon }) {
  const handleClick = (e) => {
    if (actionLink && actionLink.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(actionLink);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  const finalHref = actionLink || href || "#";
  const isSelf = finalHref.startsWith("mailto:") || finalHref.startsWith("#");

  return (
    <div className="group col-span-12 md:col-span-6 lg:col-span-5 flex flex-col h-full">
      <div className="relative overflow-hidden p-10 h-full transition-all duration-300 bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl border border-slate-800 hover:border-slate-600 hover:-translate-y-1">
        <div className="absolute top-0 right-0 p-8 transition-opacity duration-300 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 pointer-events-none">
          <Icon name={icon} className="text-6xl text-gray-900 dark:text-gray-100" />
        </div>
        <p className="text-xs tracking-widest uppercase mb-4 text-primary font-sans">
          {label}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 break-words text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
          {title}
        </h2>
        <a
          href={finalHref}
          onClick={handleClick}
          target={isSelf ? "_self" : "_blank"}
          rel={isSelf ? undefined : "noopener noreferrer"}
          className="inline-flex items-center gap-2 transition-all duration-200 text-primary border-b border-primary/20 hover:border-primary pb-1 font-sans"
        >
          {linkText}
          <Icon name={linkIcon} className="text-sm" />
        </a>
      </div>
    </div>
  );
}

function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

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
          setFormData({ name: '', email: '', message: '' });
          if (onSuccess) onSuccess();
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

  const baseInputClass = "w-full bg-transparent border-0 border-b border-slate-700 focus:border-blue-500 focus:ring-0 px-2 py-4 text-lg text-white placeholder-slate-500 font-sans transition-colors outline-none";
  const errorInputClass = `${baseInputClass} !border-red-500`;

  return (
    <div className="flex justify-center w-full">
      <div id="contact" className="w-full max-w-4xl relative bg-slate-900 rounded-2xl shadow-lg border border-slate-800" style={{ padding: "clamp(2rem, 6vw, 4rem)" }}>
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest uppercase block mb-4 text-primary font-sans">
            Drop a line
          </span>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
            Project Inquiry
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-gray-500 dark:text-gray-400 mb-2 ml-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? errorInputClass : baseInputClass}
              />
              {errors.name && <p className="mt-2 text-sm text-red-500 font-sans">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-gray-500 dark:text-gray-400 mb-2 ml-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? errorInputClass : baseInputClass}
              />
              {errors.email && <p className="mt-2 text-sm text-red-500 font-sans">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-gray-500 dark:text-gray-400 mb-2 ml-1">Message</label>
            <textarea
              name="message"
              placeholder="Tell me about your vision..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`${errors.message ? errorInputClass : baseInputClass} resize-none`}
            />
            {errors.message && <p className="mt-2 text-sm text-red-500 font-sans">{errors.message}</p>}
          </div>
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="relative inline-flex items-center gap-2 justify-center font-bold text-lg transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl shadow-lg border-none cursor-pointer"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              🚀 Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Connect({ onSuccess }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;700;800&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
      `}</style>

      <div className="w-full min-h-screen bg-slate-950 transition-colors duration-300">
        <main
          className="pb-24 px-8 max-w-[1440px] mx-auto"
          style={{ paddingTop: "8rem" }}
        >
          <section className="mb-24">
            {/* Hero heading */}
            <div className="grid grid-cols-12 gap-8 mb-20">
              <div className="col-span-12">
                <h1
                  className="font-extrabold tracking-tighter leading-none mb-6 text-white"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "clamp(4rem, 10vw, 8rem)",
                    lineHeight: 0.9,
                  }}
                >
                  LET&apos;S CONNECT
                </h1>
                <p
                  className="text-lg md:text-xl font-medium tracking-tight text-slate-400 ml-1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Have a project in mind or just want to chat? Feel free to reach out!
                </p>
              </div>

            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-12 gap-8 mb-32">
              <ContactCard
                icon="alternate_email"
                label="Email"
                title="raishivang69@gmail.com"
                linkText="Shoot an inquiry"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=raishivang69@gmail.com"
                actionLink="#contact"
                linkIcon="arrow_forward"
              />
              <div className="hidden lg:block lg:col-span-2" />
              <ContactCard
                icon="share"
                label="LinkedIn"
                title="Connect with me"
                linkText="View Professional Profile"
                href="https://www.linkedin.com/in/shivang-rai-58b45728b"
                linkIcon="north_east"
              />
            </div>

            {/* Contact form */}
            <ContactForm onSuccess={onSuccess} />
          </section>
        </main>
      </div>
    </>
  );
}