export const resourceRoutes = {
  guidelines: '/guidelines/',
  'lsa-events': '/events/',
  'university-resources': '/university-resources/',
  'article-of-the-month': '/articles/'
} as const;

export const resourceLabels = {
  guidelines: 'Guidelines',
  'lsa-events': 'Events',
  'university-resources': 'University Resources',
  'article-of-the-month': 'Articles'
} as const;

export function getResourceHref(resource: {
  data: {
    category: keyof typeof resourceRoutes;
    externalUrl?: string;
    file?: string;
  };
  id: string;
}) {
  if (resource.data.category === 'article-of-the-month') {
    return `/articles/${resource.id}/`;
  }

  return resource.data.externalUrl || resource.data.file || '';
}

export function getResourceLinkLabel(resource: {
  data: {
    category: keyof typeof resourceRoutes;
    externalUrl?: string;
    file?: string;
  };
}) {
  if (resource.data.category === 'article-of-the-month') {
    return 'Read article';
  }

  return resource.data.file && !resource.data.externalUrl ? 'Download file' : 'Open resource';
}
