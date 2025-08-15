import React from 'react';
import { BlogPost } from '@/types/blog';
import { Calendar, User } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  onClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article 
      className="diary-card p-6 cursor-pointer group"
      onClick={onClick}
    >
      <h3 className="font-handwritten text-2xl text-primary mb-3 group-hover:text-primary-glow transition-colors">
        {post.title}
      </h3>
      
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {post.excerpt}
      </p>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <User size={14} />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;