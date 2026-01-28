"use client";

import { useState } from "react";
import { createPost } from "../actions";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewPostPage() {
  const [content, setContent] = useState("");

  return (
    <div className="min-h-screen bg-black text-white px-8 pb-8 pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <Link href="/admin">
            <Button variant="secondary">Cancel</Button>
          </Link>
        </div>

        <form action={createPost} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Title</label>
              <input
                name="title"
                required
                className="w-full p-2 rounded bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Slug</label>
              <input
                name="slug"
                required
                className="w-full p-2 rounded bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Excerpt</label>
            <textarea
              name="excerpt"
              rows={3}
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-white resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Content</label>
            <input type="hidden" name="content" value={content} />
            <MarkdownEditor onChange={setContent} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              id="published"
              className="w-4 h-4 rounded bg-zinc-900 border-zinc-800"
            />
            <label htmlFor="published" className="text-sm font-medium">
              Publish immediately
            </label>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
