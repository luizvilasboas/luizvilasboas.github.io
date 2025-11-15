import React from "react";

const Contact = () => {
  return (
    <footer id="contact" className="bg-black dark:bg-neutral-900 py-20 px-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-mono uppercase text-white">
          Get In Touch
        </h2>
        <p className="font-mono text-lg mt-4 text-yellow-300 dark:text-yellow-400">
          Want to say hi? My inbox is always open.
        </p>
        <a
          href="mailto:luizfelipecastrovb@gmail.com"
          className="mt-8 inline-block bg-yellow-300 text-black font-mono uppercase py-3 px-12 border-2 border-yellow-300 hover:bg-black hover:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-black"
        >
          Say Hello
        </a>
        <div className="mt-16 flex justify-center gap-8">
          <a
            href="https://github.com/luizvilasboas"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono uppercase text-lg text-white hover:text-yellow-300 dark:hover:text-yellow-400"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/olooeez"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono uppercase text-lg text-white hover:text-yellow-300 dark:hover:text-yellow-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Contact;
