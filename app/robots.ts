import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Try to use a base URL from environment or fallback to production URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wordsense-ai.vercel.app';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
