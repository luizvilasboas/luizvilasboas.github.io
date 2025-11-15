import React from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="h-[60vh] flex items-center justify-center bg-yellow-300 dark:bg-yellow-400 border-b-4 border-black dark:border-yellow-300"
    >
      <div className="text-center p-8">
        <h1 className="text-6xl md:text-8xl font-mono font-bold uppercase text-black tracking-tighter">
          Luiz Felipe
        </h1>
        <p className="text-xl md:text-2xl font-mono text-black mt-4">
          Developer focused on Computer Vision and Full-stack
        </p>
        <a
          href="#projects"
          className="mt-8 inline-block bg-black text-white font-mono uppercase py-3 px-8 border-2 border-black hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
        >
          View Work
        </a>
      </div>
    </section>
  );
};

export default Hero;
