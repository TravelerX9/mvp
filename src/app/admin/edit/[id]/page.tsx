import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { EditPostForm } from "./edit-post-form";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(id)),
  });

  if (!post) {
    notFound();
  }

  return <EditPostForm post={post} />;
}
