import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { auth } from '@/auth';
import DeletePostButton from '@/components/DeletePostButton';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    await connectDB();
    const post = await Post.findById(params.id).populate('author', 'name');
    
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: `${post.title} - DevCommunity`,
      description: post.content.substring(0, 160),
    };
  } catch {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();

  await connectDB();
  const post = await Post.findById(params.id).populate('author', 'name image email');

  if (!post) {
    notFound();
  }

  const isAuthor = session?.user?.id === post.author._id.toString();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <Link
                  href={`/developers/${post.author._id}`}
                  className="font-semibold text-gray-900 hover:text-blue-600"
                >
                  {post.author.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {isAuthor && (
              <div className="flex gap-2">
                <Link
                  href={`/posts/${post._id}/edit`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </Link>
                <DeletePostButton postId={post._id.toString()} />
              </div>
            )}
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6 border-t">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <div className="mt-6">
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
}
