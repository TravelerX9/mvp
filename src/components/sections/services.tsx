'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    title: "AI Strategy",
    description: "We help you identify high-impact AI use cases for your business.",
    image: "/service-strategy.png"
  },
  {
    title: "MVP Development",
    description: "Rapid prototyping and development of production-ready AI applications.",
    image: "/service-mvp.png"
  },
  {
    title: "UI/UX Design",
    description: "World-class design that makes complex AI interactions feel intuitive.",
    image: "/service-uiux.png"
  }
] as const;

export function Services() {
  return (
    <section id="services" className="py-24 bg-black/50">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions to bring your AI vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
            >
              <div className="h-64 mb-6 -mx-4 rounded-xl overflow-hidden bg-black/20 relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
