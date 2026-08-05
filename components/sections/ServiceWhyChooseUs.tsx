"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, Clock, Coins, Wrench } from "lucide-react";

const reasons = [
  {
    title: "Expert Craftsmanship",
    desc: "Our highly trained team ensures precision and flawless execution in every detail.",
    icon: Wrench,
  },
  {
    title: "On-Time Delivery",
    desc: "We stick to strict timelines to ensure your project is completed exactly when promised.",
    icon: Clock,
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden costs or surprises. We provide clear, detailed quotations upfront.",
    icon: Coins,
  },
  {
    title: "Quality & Safety",
    desc: "BCA registered and committed to the highest safety and material standards.",
    icon: ShieldCheck,
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 ${className}`}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="flex flex-col h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}

export function ServiceWhyChooseUs() {
  return (
    <section className="py-12 md:py-16 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-wood mb-3"
          >
            Our Guarantee
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-fluid-h2 font-semibold md:font-bold text-brand-dark tracking-tight"
          >
            Why Choose Our <span className="text-brand-wood">Services</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1000px" }}>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="h-full"
              >
                <TiltCard className="h-full group">
                  <div className="w-14 h-14 rounded-xl bg-brand-cream/50 border border-brand-wood/20 flex items-center justify-center mb-6 text-brand-wood group-hover:bg-brand-wood group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {reason.desc}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
