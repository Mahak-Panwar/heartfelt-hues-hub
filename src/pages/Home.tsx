import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/PostCard';
import Mascot from '@/components/Mascot';
import { Heart, PenTool, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  const { posts } = useBlog();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 mb-16">
        <div className="flex justify-center items-center gap-4 mb-6 fade-in-up">
          <Mascot className="stagger-1" />
          <h1 className="font-handwritten text-5xl md:text-7xl text-primary stagger-2">
            Dear Diary
          </h1>
          <Heart className="text-primary stagger-3" size={40} />
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 fade-in-up stagger-2">
          Welcome to your personal sanctuary of thoughts and dreams. 
          This is where your stories come alive, where every word matters, 
          and where beautiful memories are born. ✨
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up stagger-3">
          <Link to="/write">
            <Button className="diary-button text-lg">
              <PenTool className="mr-2" size={20} />
              Start Writing
            </Button>
          </Link>
          <Link to="/posts">
            <Button variant="outline" className="px-6 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              <Sparkles className="mr-2" size={20} />
              Read Stories
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-handwritten text-4xl text-primary mb-4">
              Recent Memories
            </h2>
            <p className="text-lg text-muted-foreground">
              Your latest thoughts and feelings, captured in words
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {recentPosts.map((post, index) => (
              <div key={post.id} className={`fade-in-up stagger-${index + 1}`}>
                <PostCard 
                  post={post}
                  onClick={() => {/* Navigate to post detail if needed */}}
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/posts">
              <Button variant="ghost" className="text-primary hover:bg-primary/10">
                View all your entries →
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Empty State for new users */}
      {posts.length === 0 && (
        <section className="text-center py-16 diary-card max-w-2xl mx-auto">
          <Mascot className="mx-auto mb-6" />
          <h2 className="font-handwritten text-3xl text-primary mb-4">
            Your diary is waiting! 📖
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every great story starts with a single word. 
            What's the first thing you'd like to share?
          </p>
          <Link to="/write">
            <Button className="diary-button text-lg">
              <Heart className="mr-2" size={20} />
              Write your first entry
            </Button>
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;