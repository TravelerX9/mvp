'use client';

import { submitContactForm } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);



  return (
    <section id="contact" className="py-24">
      <div className="container px-6 mx-auto max-w-4xl">
        <div className="relative p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Let's Build Together</h2>
              <p className="text-gray-400 mb-8">
                Ready to transform your business with AI? Fill out the form and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    📧
                  </div>
                  hello@aether.agency
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    📍
                  </div>
                  San Francisco, CA
                </div>
              </div>
            </div>

            <form action={async (formData) => {
                setIsSubmitting(true);
                const result = await submitContactForm(formData);
                setIsSubmitting(false);
                if (result.success) {
                  alert(result.message);
                  (document.getElementById('contact-form') as HTMLFormElement).reset();
                } else {
                  alert(result.message);
                }
              }} id="contact-form" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-white placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-white placeholder-gray-600"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-white placeholder-gray-600 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
