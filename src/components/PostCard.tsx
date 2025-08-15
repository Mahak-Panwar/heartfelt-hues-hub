import React from 'react';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Calendar, User, Edit, Trash2 } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  onClick?: () => void;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, onEdit, onDelete }) => {
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
      
      <div className="flex items-center justify-between">
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
        
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(post);
                }}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
              >
                <Edit size={14} />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(post.id);
                }}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={14} />
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;