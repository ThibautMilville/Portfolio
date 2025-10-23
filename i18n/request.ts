import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async ({ locale }) => {
  // Try to get locale from headers if not provided
  const headersList = await headers();
  const headerLocale = headersList.get('x-next-intl-locale');
  
  // Use header locale if available, otherwise use provided locale, fallback to 'en'
  const validLocale = headerLocale || locale || 'en';
  
  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});