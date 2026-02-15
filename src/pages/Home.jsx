import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaFileDownload } from "react-icons/fa";

const Home = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={28} />,
      url: "https://www.linkedin.com/in/shivang-rai-58b45728b/",
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      icon: <FaGithub size={28} />,
      url: "https://github.com/shivangrai5143",
      color: "hover:text-gray-800",
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={28} />,
      url: "https://x.com/raishivang_69/",
      color: "hover:text-sky-500",
    },
    {
      name: "Email",
      icon: <FaEnvelope size={28} />,
      // FIXED (mailto added)
      url: "mailto:raishivang69@gmail.com",
      color: "hover:text-red-500",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl">

            {/* Clicking photo opens resume */}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <img
                src="/copy.jpeg"
                alt="Shivang Rai"
                className="w-full h-full object-cover cursor-pointer"
              />
            </a>

          </div>
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Hi, I'm <span className="text-blue-600">Shivang Rai</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          MERN Stack Developer | Building Scalable & Interactive Web Applications
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-10">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-blue-600 ${link.color} transition-all duration-300 transform hover:scale-110`}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

      
        <a
          href="/resume.pdf"
          download="Shivang_Rai_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaFileDownload size={20} />
          Download Resume
        </a>

      </div>
    </div>
  );
};

export default Home;
