import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { auth } from '@/auth';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import EditPostForm from '@/components/EditPostForm';

export const metadata: Metadata = {
  title: 'Edit Post - DevCommunity',
  description: 'Edit your post',
};

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/signin');
  }

  await connectDB();
  const post = await Post.findById(params.id);

  if (!post) {
    notFound();
  }

  if (post.author.toString() !== session.user.id) {
    redirect('/posts');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Edit Post</h1>
      <EditPostForm
        postId={post._id.toString()}
        initialTitle={post.title}
        initialContent={post.content}
        initialTags={post.tags?.join(', ') || ''}
      />
    </div>
  );
}
