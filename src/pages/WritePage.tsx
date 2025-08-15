import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddPostForm from '@/components/AddPostForm';
import { PenTool, Sparkles } from 'lucide-react';
import { BlogPost } from '@/types/blog';

const WritePage: React.FC = () => {
  const location = useLocation();
  const editPost = location.state?.editPost as BlogPost | undefined;
  const navigate = useNavigate();

  const handlePostAdded = () => {
    // Navigate to posts list after successful submission
    setTimeout(() => {
      navigate('/posts');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <PenTool className="text-primary" size={32} />
          <h1 className="font-handwritten text-4xl md:text-5xl text-primary">
            {editPost ? 'Edit Your Story' : 'Express Yourself'}
          </h1>
          <Sparkles className="text-primary" size={32} />
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {editPost 
            ? 'Make your story even better. Edit and refine your thoughts. ✨'
            : 'This is your space to be vulnerable, creative, and authentic. Let your thoughts flow freely and create something beautiful.'
          }
        </p>
      </div>

      <div className="fade-in-up">
        <AddPostForm editPost={editPost} onPostAdded={handlePostAdded} />
      </div>
    </div>
  );
};

export default WritePage;