import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import deepmerge from 'deepmerge';

export default getRequestConfig(async ({ locale }) => {
  // Try to get locale from headers if not provided
  const headersList = await headers();
  const headerLocale = headersList.get('x-next-intl-locale');
  
  // Use header locale if available, otherwise use provided locale, fallback to 'en'
  const validLocale = headerLocale || locale || 'en';

         // Charger tous les fichiers de traduction
         const [common, hero, featuredProjects, experiences, formations, skills, 
                objectives, testimonials, partners, homeContact, pagesProjects, 
                pagesFormations, pagesExperiences, pagesContact, carousels, ui,
                dataFormations, dataExperiences, dataProjects, skillDescriptions] = await Promise.all([
    import(`../messages/${validLocale}/common.json`),
    import(`../messages/${validLocale}/home/hero.json`),
    import(`../messages/${validLocale}/home/featured-projects.json`),
    import(`../messages/${validLocale}/home/experiences.json`),
    import(`../messages/${validLocale}/home/formations.json`),
    import(`../messages/${validLocale}/home/skills.json`),
    import(`../messages/${validLocale}/home/objectives.json`),
    import(`../messages/${validLocale}/home/testimonials.json`),
    import(`../messages/${validLocale}/home/partners.json`),
    import(`../messages/${validLocale}/home/contact.json`),
    import(`../messages/${validLocale}/pages/projets.json`),
    import(`../messages/${validLocale}/pages/formations.json`),
    import(`../messages/${validLocale}/pages/experiences.json`),
           import(`../messages/${validLocale}/pages/contact.json`),
           import(`../messages/${validLocale}/components/carousels.json`),
           import(`../messages/${validLocale}/components/ui.json`),
           import(`../messages/${validLocale}/data/formations.json`),
           import(`../messages/${validLocale}/data/experiences.json`),
           import(`../messages/${validLocale}/data/projects.json`),
           import(`../messages/${validLocale}/home/skill-descriptions.json`),
         ]);

  // Fusionner les messages
  const messages = deepmerge.all([
    common.default,
    { Home: {
      hero: hero.default,
      featuredProjects: featuredProjects.default,
      experiences: experiences.default,
      formations: formations.default,
      skills: skills.default,
      objectives: objectives.default,
      testimonials: testimonials.default,
      partners: partners.default,
      contact: homeContact.default,
      skillDescriptions: skillDescriptions.default,
    }},
    { Pages: {
      projets: pagesProjects.default,
      formations: pagesFormations.default,
      experiences: pagesExperiences.default,
      contact: pagesContact.default,
    }},
           { Components: {
             carousels: carousels.default,
             ui: ui.default,
           }},
           { Data: {
             formations: dataFormations.default,
             experiences: dataExperiences.default,
             projects: dataProjects.default,
           }}
         ]);
  
  return {
    locale: validLocale,
    messages
  };
});