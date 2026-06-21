"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { siteConfig } from "@/constants/site-config";
import { addDocument } from "@/lib/firestore";

// ── Contact Card ───────────────────────────────────────────────────────────
interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  title: string;
  linkText: string;
  href: string;
  actionLink?: string;
  external?: boolean;
}

const ContactCard = ({
  icon,
  label,
  title,
  linkText,
  href,
  actionLink,
  external = false,
}: ContactCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (actionLink && actionLink.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(actionLink);
      if (element) {
        const navbarHeight = 64;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const finalHref = actionLink || href || "#";
  const isSelf = finalHref.startsWith("mailto:") || finalHref.startsWith("#");

  return (
    <div className="group col-span-12 md:col-span-6 lg:col-span-5 flex flex-col h-full">
      <div className="relative overflow-hidden p-10 h-full transition-all duration-300 bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-600 hover:-translate-y-1">
        <div className="absolute top-0 right-0 p-8 transition-opacity duration-300 opacity-5 group-hover:opacity-10 pointer-events-none">
          <div className="text-6xl text-gray-900 dark:text-gray-100">{icon}</div>
        </div>
        <p className="text-xs tracking-widest uppercase mb-4 text-primary font-sans">
          {label}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 break-words text-gray-900 dark:text-white font-heading">
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
          {external ? (
            <FaExternalLinkAlt className="text-sm" />
          ) : (
            <FaArrowRight className="text-sm" />
          )}
        </a>
      </div>
    </div>
  );
};

// ── Contact Form ───────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const messageData = {
          ...formData,
          createdAt: new Date().toISOString(),
          read: false,
        };

        await addDocument("messages", messageData);

        setFormData({ name: "", email: "", message: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } catch (error) {
        console.error("Submission failed:", error);
        alert("Sorry, there was an error sending your message.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const baseInputClass =
    "w-full bg-transparent border-0 border-b border-gray-300 dark:border-slate-700 focus:border-blue-500 focus:ring-0 px-2 py-4 text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 font-sans transition-colors outline-none";
  const errorInputClass = `${baseInputClass} !border-red-500`;

  return (
    <div className="flex justify-center w-full">
      <div
        id="contact"
        className="w-full max-w-4xl relative bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800"
        style={{ padding: "clamp(2rem, 6vw, 4rem)" }}
      >
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest uppercase block mb-4 text-primary font-sans">
            Drop a line
          </span>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white font-heading">
            Project Inquiry
          </h3>
        </div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-center font-sans"
          >
            ✓ Message sent successfully! I&apos;ll get back to you soon.
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-gray-500 dark:text-gray-400 mb-2 ml-1">
                Name
              </label>
              <input suppressHydrationWarning
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? errorInputClass : baseInputClass}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500 font-sans">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-gray-500 dark:text-gray-400 mb-2 ml-1">
                Email
              </label>
              <input suppressHydrationWarning
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? errorInputClass : baseInputClass}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 font-sans">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-gray-500 dark:text-gray-400 mb-2 ml-1">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Tell me about your vision..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`${
                errors.message ? errorInputClass : baseInputClass
              } resize-none`}
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-500 font-sans">
                {errors.message}
              </p>
            )}
          </div>
          <div className="flex justify-center pt-6">
            <button suppressHydrationWarning
              type="submit"
              disabled={isSubmitting}
              className="relative inline-flex items-center gap-2 justify-center font-bold text-lg transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl shadow-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed font-heading"
            >
              {isSubmitting ? "Sending..." : "🚀 Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Main Connect Component ─────────────────────────────────────────────────
const Connect = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <main
        className="pb-24 px-8 max-w-[1440px] mx-auto"
        style={{ paddingTop: "8rem" }}
      >
        <section className="mb-24">
          {/* Hero heading */}
          <div className="grid grid-cols-12 gap-8 mb-20">
            <div className="col-span-12">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-extrabold tracking-tighter leading-none mb-6 text-gray-900 dark:text-white font-heading"
                style={{
                  fontSize: "clamp(4rem, 10vw, 8rem)",
                  lineHeight: 0.9,
                }}
              >
                LET&apos;S CONNECT
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl font-medium tracking-tight text-gray-600 dark:text-slate-400 ml-1 font-sans"
              >
                Have a project in mind or just want to chat? Feel free to reach
                out!
              </motion.p>
            </div>
          </div>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-12 gap-8 mb-32"
          >
            <ContactCard
              icon={<FaEnvelope />}
              label="Email"
              title={siteConfig.email}
              linkText="Shoot an inquiry"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}`}
              actionLink="#contact"
            />
            <div className="hidden lg:block lg:col-span-2" />
            <ContactCard
              icon={<FaLinkedin />}
              label="LinkedIn"
              title="Connect with me"
              linkText="View Professional Profile"
              href={siteConfig.linkedinUrl}
              external
            />
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Connect;
