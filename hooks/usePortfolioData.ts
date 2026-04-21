"use client";

import { Experience, Formation, Project, Skill } from "@/types/portfolio";
import { fetchExperiences, fetchFormations, fetchProjects, fetchSkills } from "@/lib/api/portfolio";
import React from "react";

type PortfolioDataState = {
  experiences: Experience[];
  formations: Formation[];
  projects: Project[];
  skills: Skill[];
  loading: boolean;
};

const initialState: PortfolioDataState = {
  experiences: [],
  formations: [],
  projects: [],
  skills: [],
  loading: true
};

export const usePortfolioData = () => {
  const [state, setState] = React.useState<PortfolioDataState>(initialState);

  React.useEffect(() => {
    const run = async () => {
      const [experiencesResult, formationsResult, projectsResult, skillsResult] = await Promise.allSettled([
        fetchExperiences(),
        fetchFormations(),
        fetchProjects(),
        fetchSkills()
      ]);

      setState({
        experiences: experiencesResult.status === "fulfilled" ? experiencesResult.value : [],
        formations: formationsResult.status === "fulfilled" ? formationsResult.value : [],
        projects: projectsResult.status === "fulfilled" ? projectsResult.value : [],
        skills: skillsResult.status === "fulfilled" ? skillsResult.value : [],
        loading: false
      });
    };

    run();
  }, []);

  return state;
};
