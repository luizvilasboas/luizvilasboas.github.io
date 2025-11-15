import React, { useState, useMemo, useEffect, useRef } from "react";
import { allProjects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { ChevronDownIcon } from "../components/icons/ChevronDownIcon";

const PROJECTS_PER_PAGE = 6;

const allTags = ["All", ...new Set(allProjects.flatMap((p) => p.tags))];

const AllProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesTag =
        activeTag === "All" || project.tags.includes(activeTag);
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [searchTerm, activeTag]);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  return (
    <div
      ref={topRef}
      className="bg-white dark:bg-black py-16 px-8 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold font-mono uppercase text-left mb-4 dark:text-white">
          All Projects
        </h1>
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/3 p-2 font-mono text-lg bg-transparent border-2 border-black dark:border-white dark:text-white focus:outline-none focus:bg-yellow-300 dark:focus:bg-yellow-400 dark:focus:text-black"
          />
          <div className="relative w-full md:w-auto">
            <select
              value={activeTag}
              onChange={(e) => {
                setActiveTag(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-auto h-full p-2 pr-8 font-mono uppercase bg-transparent border-2 border-black dark:border-white text-black dark:text-white focus:outline-none dark:focus:text-black appearance-none"
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black dark:text-white">
              <ChevronDownIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))
          ) : (
            <p className="col-span-full text-center font-mono text-lg dark:text-gray-400">
              No projects found.
            </p>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 font-mono uppercase border-2 border-black dark:border-white disabled:opacity-50 disabled:cursor-not-allowed dark:text-white"
            >
              &larr; Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-10 h-10 font-mono border-2 border-black dark:border-white ${currentPage === pageNum ? "bg-black text-white dark:bg-white dark:text-black" : "dark:text-white"}`}
                >
                  {pageNum}
                </button>
              ),
            )}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 font-mono uppercase border-2 border-black dark:border-white disabled:opacity-50 disabled:cursor-not-allowed dark:text-white"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjectsPage;
