import { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Home - DevCommunity',
  description: 'Welcome to DevCommunity - Connect with developers worldwide',
};

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to DevCommunity
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A platform where developers connect, share knowledge, and grow together.
          Join our community to publish posts, showcase your skills, and learn from others.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          {session?.user ? (
            <>
              <Link
                href="/posts"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              >
                Browse Posts
              </Link>
              <Link
                href="/posts/new"
                className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition"
              >
                Create Post
              </Link>
            </>
          ) : (
            <Link
              href="/signin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Share Knowledge</h3>
            <p className="text-gray-600">
              Write posts about your projects, learnings, and experiences to help others grow.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Build Your Profile</h3>
            <p className="text-gray-600">
              Showcase your skills, projects, and connect with other developers in the community.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Connect & Grow</h3>
            <p className="text-gray-600">
              Network with developers worldwide and learn from diverse perspectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
