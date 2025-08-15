import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BlogPost, NewPostData, connectToDatabase } from '@/types/blog';

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: NewPostData) => Promise<void>;
  editPost: (id: string, post: NewPostData) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  isLoading: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Mock data for initial posts
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'My First Entry 💝',
    content: 'Today marks the beginning of something beautiful. I decided to start this diary to capture all the little moments that make life special. There\'s something magical about putting thoughts into words...',
    author: 'You',
    date: new Date('2024-08-14'),
    excerpt: 'Today marks the beginning of something beautiful. I decided to start this diary to capture all the little moments...'
  },
  {
    id: '2',
    title: 'Morning Coffee Thoughts ☕',
    content: 'The steam rising from my coffee cup this morning reminded me of how simple pleasures can bring such joy. Sometimes I think we overcomplicate happiness when it\'s right there in front of us.',
    author: 'You',
    date: new Date('2024-08-13'),
    excerpt: 'The steam rising from my coffee cup this morning reminded me of how simple pleasures can bring such joy...'
  },
  {
    id: '3',
    title: 'Dreams and Wishes 🌟',
    content: 'I had the most vivid dream last night. I was flying over fields of sunflowers, and everything felt possible. When I woke up, I decided to write down three things I want to achieve this year.',
    author: 'You',
    date: new Date('2024-08-12'),
    excerpt: 'I had the most vivid dream last night. I was flying over fields of sunflowers, and everything felt possible...'
  }
];

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [isLoading, setIsLoading] = useState(false);

  const addPost = async (newPostData: NewPostData): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate database connection
      await connectToDatabase();
      
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: newPostData.title,
        content: newPostData.content,
        author: newPostData.author || 'You',
        date: new Date(),
        excerpt: newPostData.content.substring(0, 120) + (newPostData.content.length > 120 ? '...' : '')
      };

      setPosts(prevPosts => [newPost, ...prevPosts]);
    } finally {
      setIsLoading(false);
    }
  };

  const editPost = async (id: string, updatedData: NewPostData): Promise<void> => {
    setIsLoading(true);
    
    try {
      await connectToDatabase();
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id 
            ? {
                ...post,
                title: updatedData.title,
                content: updatedData.content,
                author: updatedData.author || 'You',
                excerpt: updatedData.content.substring(0, 120) + (updatedData.content.length > 120 ? '...' : '')
              }
            : post
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      await connectToDatabase();
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, editPost, deletePost, isLoading }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};