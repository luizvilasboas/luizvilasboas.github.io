const technologies = ['JavaScript', 'Python', 'C/C++', 'Node.js', 'FastAPI', 'React', 'PyTorch', 'TensorFlow', 'Docker', 'Kubernetes'];

const About = () => {
  return (
    <section id="about" className="bg-white dark:bg-black py-16 px-8 border-b-4 border-black dark:border-yellow-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <h2 className="text-4xl font-bold font-mono uppercase dark:text-white">
            About Me
          </h2>
        </div>
        <div className="md:col-span-2 dark:text-gray-300">
          <p className="font-mono text-lg mb-4">
            I'm a software developer with a focus on full-stack development and computer vision.
          </p>
          <p className="font-mono text-lg">
            I have a degree in Information Systems from the Federal University of Viçosa (UFV), and I currently work in these areas at Pix Force.
          </p>
          <div className="mt-8">
            <h3 className="font-mono font-bold text-xl uppercase mb-4 text-black dark:text-white">My Toolkit:</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <div key={tech} className="bg-white text-black font-mono uppercase text-sm border-2 border-black py-1 px-3 dark:bg-black dark:text-white dark:border-white transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutalist dark:hover:shadow-brutalist-dark border-2 border-black">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;