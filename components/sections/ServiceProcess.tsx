"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "We discuss your vision, requirements, and budget to align on goals.",
  },
  {
    num: "02",
    title: "Site Inspection",
    desc: "Our team assesses the site to provide a precise, transparent quotation.",
  },
  {
    num: "03",
    title: "Design & Planning",
    desc: "We finalize the layout, materials, and timeline for a smooth workflow.",
  },
  {
    num: "04",
    title: "Execution",
    desc: "Skilled craftsmen bring the plans to life with strict quality controls.",
  },
  {
    num: "05",
    title: "Handover",
    desc: "We conduct a final walkthrough with you to ensure absolute satisfaction.",
  },
];

export function ServiceProcess() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-wood mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-fluid-h2 font-semibold md:font-bold text-brand-dark tracking-tight"
          >
            Our Simple <span className="text-brand-wood">Process</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line Desktop */}
          <div className="hidden lg:block absolute top-[32px] left-[10%] right-[10%] h-[2px] bg-gray-100" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-4 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Connecting Line Mobile */}
                {index !== steps.length - 1 && (
                  <div className="block lg:hidden absolute top-[64px] left-[50%] w-[2px] h-[calc(100%-16px)] bg-gray-100 -translate-x-1/2 -z-10" />
                )}

                {/* Number Bubble */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-full bg-brand-cream border-[6px] border-white shadow-[0_4px_20px_rgb(0,0,0,0.06)] flex items-center justify-center text-xl font-bold text-brand-wood mb-6 transition-colors duration-300 group-hover:bg-brand-wood group-hover:text-white"
                >
                  {step.num}
                </motion.div>
                
                <h3 className="text-lg font-bold text-brand-dark mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-[250px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
