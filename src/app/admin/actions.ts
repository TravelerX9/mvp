"use server";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

async function checkAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createPost(formData: FormData) {
  await checkAuth();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const published = formData.get("published") === "on";

  await db.insert(posts).values({
    title,
    slug,
    content,
    excerpt,
    published,
  });

  redirect("/admin");
}

export async function updatePost(id: number, formData: FormData) {
  await checkAuth();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const published = formData.get("published") === "on";

  await db.update(posts)
    .set({
      title,
      slug,
      content,
      excerpt,
      published,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id));

  redirect("/admin");
}

export async function deletePost(id: number) {
  await checkAuth();
  await db.delete(posts).where(eq(posts.id, id));
  redirect("/admin");
}
