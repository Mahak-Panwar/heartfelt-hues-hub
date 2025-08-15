import React, { useState, useEffect } from 'react';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BlogPost } from '@/types/blog';
import Mascot from './Mascot';

interface AddPostFormProps {
  editPost?: BlogPost;
  onPostAdded?: () => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ editPost, onPostAdded }) => {
  const [title, setTitle] = useState(editPost?.title || '');
  const [content, setContent] = useState(editPost?.content || '');
  const [author, setAuthor] = useState(editPost?.author || 'You');
  const { addPost, editPost: updatePost, isLoading } = useBlog();
  const { toast } = useToast();

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setContent(editPost.content);
      setAuthor(editPost.author);
    }
  }, [editPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Oops! 📝",
        description: "Please fill in both title and content to share your thoughts.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editPost) {
        await updatePost(editPost.id, {
          title: title.trim(),
          content: content.trim(),
          author: author.trim() || 'You'
        });
        toast({
          title: "Updated! ✨",
          description: "Your diary entry has been updated beautifully.",
        });
      } else {
        await addPost({
          title: title.trim(),
          content: content.trim(),
          author: author.trim() || 'You'
        });
        toast({
          title: "Beautiful! ✨",
          description: "Your diary entry has been saved with love.",
        });
      }

      // Reset form
      setTitle('');
      setContent('');
      setAuthor('You');

      onPostAdded?.();
    } catch (error) {
      toast({
        title: "Oh no! 💔",
        description: "Something went wrong while saving your entry. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="diary-card max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Mascot />
          <CardTitle className="font-handwritten text-3xl text-primary">
            {editPost ? 'Edit Your Heart' : 'Share Your Heart'}
          </CardTitle>
          <Heart className="text-primary" size={24} />
        </div>
        <p className="text-muted-foreground">
          What's on your mind today? Let your thoughts flow freely...
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm font-medium">
              Written by
            </Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name..."
              className="rounded-xl border-2 focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title your thoughts
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a beautiful title..."
              className="rounded-xl border-2 focus:border-primary transition-colors font-handwritten text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              Your story
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Pour your heart out here... Share your dreams, thoughts, and moments that matter to you."
              className="rounded-xl border-2 focus:border-primary transition-colors min-h-[200px] resize-none leading-relaxed"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="diary-button w-full text-lg font-handwritten"
          >
            {isLoading ? (
              <>
                <PenTool className="mr-2 h-5 w-5 animate-spin" />
                Saving your thoughts...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-5 w-5" />
                {editPost ? 'Update Entry' : 'Save to Diary'}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPostForm;