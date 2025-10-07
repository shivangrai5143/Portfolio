
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 text-center">
          About Me
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose max-w-none">
            <p className="text-lg text-black-700 leading-relaxed mb-6">
              I&#39;m a passionate Full Stack Developer  building
              modern web applications. My journey in software development started with a
              curiosity for problem-solving and has evolved into a career dedicated to creating
              elegant, user-centered solutions.
            </p>

            <p className="text-lg text-black-700 leading-relaxed mb-6">
              I specialize in building scalable applications using modern frameworks and
              technologies. My approach combines technical expertise with a keen eye for design,
              ensuring that every project not only functions flawlessly but also delivers an
              exceptional user experience.
            </p>

            <p className="text-lg text-black-700 leading-relaxed mb-6">
              When I'm not coding, you'll find me exploring new technologies, contributing to
              open-source projects, or sharing knowledge with the developer community through
              blog posts and mentorship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
