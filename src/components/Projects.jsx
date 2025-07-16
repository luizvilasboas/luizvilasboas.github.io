import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { allProjects } from '../data/projects';

const featuredProjects = allProjects.slice(0, 4);

const Projects = () => {
  return (
    <section id="projects" className="bg-white dark:bg-black py-16 px-8 border-b-4 border-black dark:border-yellow-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold font-mono uppercase text-center mb-12 dark:text-white">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-block bg-black text-white font-mono uppercase py-3 px-8 border-2 border-black hover:bg-yellow-300 hover:text-black dark:bg-white dark:text-black dark:hover:bg-yellow-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;