export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  excerpt: string;
}

export interface NewPostData {
  title: string;
  content: string;
  author: string;
}

// Placeholder function for database connection
export const connectToDatabase = async (): Promise<void> => {
  console.log("🔗 Connecting to database...");
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  console.log("✅ Database connected (simulated)");
};