import type { MetadataRoute } from 'next';
import { siteConfig } from '@/constants/site-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.siteUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/admin'], // Prevent indexing of admin and API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
