"use client";

import { createContext, useState, useEffect } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../lib/db";
import PropTypes from "prop-types";

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      if (!isMounted) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getProjects() || [];
        if (!isMounted) return;
        setProjects(data);
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching projects:', err);
        setError(err.message);
        setProjects([]);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    projects,
    loading,
    error,
    setProjects,
    addProject: async (project) => {
      try {
        const newProject = await createProject(project);
        setProjects(prev => [...prev, newProject]);
        return newProject;
      } catch (err) {
        console.error('Error adding project:', err);
        throw err;
      }
    },
    updateProject: async (id, updates) => {
      try {
        const updatedProject = await updateProject(id, updates);
        setProjects(prev => 
          prev.map(p => p.id === id ? updatedProject : p)
        );
        return updatedProject;
      } catch (err) {
        console.error('Error updating project:', err);
        throw err;
      }
    },
    deleteProject: async (id) => {
      try {
        await deleteProject(id);
        setProjects(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error('Error deleting project:', err);
        throw err;
      }
    }
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
