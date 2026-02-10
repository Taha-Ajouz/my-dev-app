'use client';

import { updatePost } from '@/lib/actions/post.actions';
import { useState } from 'react';

interface EditPostFormProps {
  postId: string;
  initialTitle: string;
  initialContent: string;
  initialTags: string;
}

export default function EditPostForm({
  postId,
  initialTitle,
  initialContent,
  initialTags,
}: EditPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await updatePost(postId, formData);
    } catch (error: any) {
      alert(error.message || 'Failed to update post');
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
          defaultValue={initialTitle}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          defaultValue={initialContent}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          defaultValue={initialTags}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Updating...' : 'Update Post'}
      </button>
    </form>
  );
}
