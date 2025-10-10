import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaFileDownload } from 'react-icons/fa';

const Home = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={28} />,
      url: 'https://www.linkedin.com/in/shivang-rai-58b45728b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      color: 'hover:text-blue-600',
    },
    {
      name: 'GitHub',
      icon: <FaGithub size={28} />,
      url: 'https://github.com/shivangrai5143',
      color: 'hover:text-gray-800',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter size={28} />,
      url: 'https://x.com/raishivang_69?s=09',
      color: 'hover:text-blue-400',
    },
    {
      name: 'Email',
      icon: <FaEnvelope size={28} />,
      url: 'raishivang69@gmail.com',
      color: 'hover:text-red-500',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
            <img
              src="copy.jpeg"
              alt="Professional headshot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Hi, I&apos;m <span className="text-primary">Shivang Rai</span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Full Stack Developer | Creating Beautiful & Functional Web Experiences
        </p>

        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-blue-6000= ${link.color} transition-all duration-300 transform hover:scale-110`}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 bg-primary text-black px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaFileDownload size={20} />
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Home;
