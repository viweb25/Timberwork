"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const serviceOptions = [
  "General Construction",
  "Renovation Works",
  "Interior Works",
  "M&E Services",
  "Maintenance Services",
  "Other / Not Sure",
];

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Please tell us about your project.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_WEB3FORMS_KEY",
          subject: `New Enquiry from ${form.name}  Timberpark Website`,
          from_name: form.name,
          ...form,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm max-w-sm">
          Thank you for reaching out. Our team will get back to you within 1 business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-brand-wood text-sm font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold tracking-tight text-brand-dark mb-2">
            Full Name <span className="text-brand-wood">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className={`w-full border ${errors.name ? "border-red-400" : "border-gray-200"} bg-white px-4 py-3 text-sm font-normal text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-wood transition-colors duration-200`}
          />
          {errors.name && <p className="mt-1 text-red-500 text-xs font-normal">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold tracking-tight text-brand-dark mb-2">
            Email Address <span className="text-brand-wood">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Mail@example.com"
            className={`w-full border ${errors.email ? "border-red-400" : "border-gray-200"} bg-white px-4 py-3 text-sm font-normal text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-wood transition-colors duration-200`}
          />
          {errors.email && <p className="mt-1 text-red-500 text-xs font-normal">{errors.email}</p>}
        </div>
      </div>

      {/* Phone + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold tracking-tight text-brand-dark mb-2">
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98123 45067"
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-wood transition-colors duration-200"
          />
        </div>

        <div>
          <label htmlFor="contact-service" className="block text-xs font-semibold tracking-tight text-brand-dark mb-2">
            Service Required
          </label>
          <select
            id="contact-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-brand-dark focus:outline-none focus:border-brand-wood transition-colors duration-200 appearance-none"
          >
            <option value="">Select a service...</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold tracking-tight text-brand-dark mb-2">
          Project Details <span className="text-brand-wood">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project — location, scope, timeline, budget range..."
          className={`w-full border ${errors.message ? "border-red-400" : "border-gray-200"} bg-white px-4 py-3 text-sm font-normal text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-wood transition-colors duration-200 resize-none`}
        />
        {errors.message && <p className="mt-1 text-red-500 text-xs font-normal">{errors.message}</p>}
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-red-500 text-sm">
          Something went wrong. Please try again or email us directly at{" "}
          <a href="mailto:timberpark4@gmail.com" className="underline">timberpark4@gmail.com</a>.
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
        id="contact-submit"
        className="w-full sm:w-auto justify-center"
      >
        {status === "loading" ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
