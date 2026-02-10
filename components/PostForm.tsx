'use client';

import { createPost } from '@/lib/actions/post.actions';
import { useState } from 'react';

export default function PostForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await createPost(formData);
    } catch (error: any) {
      alert(error.message || 'Failed to create post');
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="bg-white text-black rounded-lg shadow-md p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Share your knowledge..."
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="javascript, react, nextjs"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Publishing...' : 'Publish Post'}
      </button>
    </form>
  );
}
