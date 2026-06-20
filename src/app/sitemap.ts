import type { MetadataRoute } from 'next';
import { siteConfig } from '@/constants/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // We do not map /admin routes because they should not be indexed
  ];
}
