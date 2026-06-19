import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WordSense AI - Premium English-to-Urdu Dictionary',
    short_name: 'WordSense AI',
    description: 'Experience the power of AI with WordSense. Search English words, get Urdu meanings, examples, and instant Text-to-Speech.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#2563eb',
    icons: [
      {
        "src": "/favicon.ico",
        "sizes": "any",
        "type": "image/x-icon"
      }
    ],
  };
}
