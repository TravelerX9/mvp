import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default async function BlogPage() {
  const publishedPosts = await db.query.posts.findMany({
    where: eq(posts.published, true),
    orderBy: [desc(posts.createdAt)],
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
            Blog.
          </h1>
          <div className="grid gap-8">
            {publishedPosts.map((post) => (
              <article
                key={post.id}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt || "No excerpt available."}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{post.createdAt?.toLocaleDateString()}</span>
                  </div>
                </Link>
              </article>
            ))}
            {publishedPosts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No posts published yet.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
