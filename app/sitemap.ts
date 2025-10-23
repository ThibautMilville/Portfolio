import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thibaut-milville.dev'
  const locales = ['en', 'fr']
  
  const routes = [
    '',
    '/projets',
    '/experiences', 
    '/formations',
    '/contact'
  ]
  
  const sitemap: MetadataRoute.Sitemap = []
  
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'monthly' : route === '/projets' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/projets' ? 0.8 : route === '/experiences' ? 0.7 : route === '/formations' ? 0.6 : 0.5,
      })
    })
  })
  
  return sitemap
}
