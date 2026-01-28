import { db } from "@/lib/db";
import { posts, contacts } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { desc } from "drizzle-orm";

export default async function AdminDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/admin/login");
  }

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  const allContacts = await db.select().from(contacts).orderBy(desc(contacts.createdAt));

  return (
    <div className="min-h-screen bg-black text-white px-8 pb-8 pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
             <span className="self-center text-sm text-gray-400">Welcome, {session.user.name}</span>
            <Link href="/admin/new">
              <Button>Create New Post</Button>
            </Link>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 text-gray-400 text-sm uppercase">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {allPosts.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4 font-medium">{post.title}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        post.published
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">
                    {post.createdAt?.toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link href={`/admin/edit/${post.id}`}>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </Link>
                    {/* Delete button would go here, likely a client component or form action */}
                  </td>
                </tr>
              ))}
              {allPosts.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No posts found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold">Contact Messages</h2>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 text-gray-400 text-sm uppercase">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {allContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4 font-medium">{contact.name}</td>
                  <td className="p-4 text-gray-400">{contact.email}</td>
                  <td className="p-4 text-gray-400 max-w-xs truncate" title={contact.message}>
                    {contact.message}
                  </td>
                  <td className="p-4 text-gray-400">
                    {contact.createdAt?.toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {allContacts.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
