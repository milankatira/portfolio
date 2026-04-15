export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  tags?: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}
