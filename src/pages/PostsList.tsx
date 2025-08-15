import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/PostCard';
import Mascot from '@/components/Mascot';
import { PenTool, BookOpen } from 'lucide-react';

const PostsList: React.FC = () => {
  const { posts } = useBlog();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BookOpen className="text-primary" size={32} />
          <h1 className="font-handwritten text-4xl md:text-5xl text-primary">
            All Your Stories
          </h1>
          <Mascot />
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Every entry is a piece of your journey. Relive your moments and see how far you've come.
        </p>
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {posts.map((post, index) => (
              <div key={post.id} className={`fade-in-up stagger-${Math.min(index + 1, 4)}`}>
                <PostCard 
                  post={post}
                  onClick={() => {/* Navigate to post detail if needed */}}
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/write">
              <Button className="diary-button text-lg">
                <PenTool className="mr-2" size={20} />
                Add Another Entry
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-16 diary-card max-w-2xl mx-auto">
          <Mascot className="mx-auto mb-6" />
          <h2 className="font-handwritten text-3xl text-primary mb-4">
            No stories yet! 📝
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Your diary is empty but full of possibilities. 
            Start writing and watch your collection of memories grow.
          </p>
          <Link to="/write">
            <Button className="diary-button text-lg">
              <PenTool className="mr-2" size={20} />
              Write Your First Story
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostsList;