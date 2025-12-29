interface Article {
  id: number;
  title: string;
  subtitle: string | null;
  content: string;
  mediaPath: string | null;
  footer: string | null;
  categoryId: number;
  category: null;
}

export type { Article };