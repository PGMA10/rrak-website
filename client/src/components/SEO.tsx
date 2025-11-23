import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  url?: string;
}

export function SEO({ 
  title, 
  description, 
  ogImage = '/og-image.png',
  ogType = 'website',
  url 
}: SEOProps) {
  useEffect(() => {
    document.title = `${title} | Route Reach AK`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    const ogTags = [
      { property: 'og:title', content: `${title} | Route Reach AK` },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: 'Route Reach AK' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${title} | Route Reach AK` },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ];
    
    if (url) {
      ogTags.push({ property: 'og:url', content: url });
    }
    
    ogTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', property);
        } else if (name) {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [title, description, ogImage, ogType, url]);
  
  return null;
}
