// Export all data types
export * from './types';

// Export all data arrays
export { experiences } from './experiences';
export { formations } from './formations';
export { projects } from './projects';

// Re-export utility functions from the original data.ts
export {
  getProjectById,
  getProjectBySlug,
  getProjectSlug,
  getAllProjects,
  getExperienceById,
  getAllExperiences,
  getFormationById,
  getAllFormations,
  getRelatedExperience,
  getRelatedFormations,
  getProjectsByExperience,
  getProjectsByFormation,
  getFormationsByExperience,
  getRelatedExperiences,
  getExperiencesByFormation,
  getGroupedExperiences
} from '../lib/data';
