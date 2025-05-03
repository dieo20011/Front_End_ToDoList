export const queryList = [
  {
    id: 1,
    name: 'Bitcoin',
    query: 'bitcoin',
  },
  {
    id: 2,
    name: 'Bussiness',
    query: 'business',
  },
  {
    id: 3,
    name: 'Entertainment',
    query: 'entertainment',
  },
  {
    id: 4,
    name: 'General',
    query: 'general',
  },
  {
    id: 5,
    name: 'Health',
    query: 'health',
  },
  {
    id: 6,
    name: 'Science',
    query: 'science',
  },
  {
    id: 7,
    name: 'Sports',
    query: 'sports',
  },
  {
    id: 8,
    name: 'Technology',
    query: 'technology',
  },
];

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}
