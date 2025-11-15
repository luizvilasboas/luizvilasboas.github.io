import React from "react";

const ProjectCard = ({ name, desc, link }) => (
  <div className="bg-white dark:bg-black dark:border-white p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutalist dark:hover:shadow-brutalist-dark border-2 border-black">
    <div>
      <h3 className="text-2xl font-bold font-mono uppercase dark:text-white">
        {name}
      </h3>
      <p className="font-mono mt-2 dark:text-gray-300">{desc}</p>
    </div>
    <a
      href={link}
      className="mt-4 font-mono uppercase bg-white text-black border-2 border-black py-2 px-4 self-start hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
    >
      View Details &rarr;
    </a>
  </div>
);

export default ProjectCard;
