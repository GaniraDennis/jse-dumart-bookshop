"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
          <p className="text-xl text-white/90">We're here to help and answer any questions you might have</p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-[var(--navy)]">Get in Touch</h2>
              <p className="mb-8 text-gray-600">
                Have a question or feedback? We'd love to hear from you. Contact us using any of the methods below.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--teal)]/10">
                  <i className="fa-solid fa-envelope text-[var(--teal)]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--navy)]">Email</h3>
                  <a
                    href="mailto:jsbookshop4@gmail.com"
                    className="text-[var(--teal)] hover:underline"
                  >
                    jsbookshop4@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--green)]/10">
                  <i className="fa-solid fa-phone text-[var(--green)]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--navy)]">Phone</h3>
                  <a href="tel:+254704454556" className="text-[var(--teal)] hover:underline">
                    +254 704 454556
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--green)]/10">
                  <i className="fa-brands fa-whatsapp text-[var(--green)]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--navy)]">WhatsApp</h3>
                  <a
                    href="https://wa.me/254704454556"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--teal)] hover:underline"
                  >
                    +254 704 454556
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--yellow)]/10">
                  <i className="fa-solid fa-map-pin text-[var(--yellow)]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--navy)]">Location</h3>
                  <p className="text-gray-600">Nairobi CBD, Kenya</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--teal)]/10">
                  <i className="fa-solid fa-clock text-[var(--teal)]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--navy)]">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border border-border p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-[var(--navy)]">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
                <i className="fa-solid fa-check-circle mr-2"></i>
                Thank you! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+254 700 000000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--navy)] text-white hover:bg-[var(--navy)]/90"
              >
                <i className="fa-solid fa-paper-plane mr-2"></i>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
