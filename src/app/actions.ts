'use server';

import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, message: 'All fields are required' };
  }

  try {
    await db.insert(contacts).values({
      name,
      email,
      message,
    });

    revalidatePath('/admin');
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, message: 'Failed to send message. Please try again.' };
  }
}
