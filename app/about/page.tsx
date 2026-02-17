"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="mb-4 text-4xl font-bold">About JSEdumart</h1>
          <p className="text-xl text-white/90">Your Trusted Partner in Educational Excellence</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-[var(--navy)]/10 shadow-lg">
              <Image
                src="/images/Book Store Shop Logo (1).png"
                alt="JSEdumart Logo"
                fill
                className="object-cover p-8"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold text-[var(--navy)]">Who We Are</h2>
            <p className="mb-4 text-lg text-gray-700">
              JSEdumart is a leading online bookstore dedicated to providing quality educational materials to students, educators, and professionals across Kenya. With a passion for learning and excellence, we've been serving the community with integrity and reliability.
            </p>
            <p className="mb-6 text-lg text-gray-700">
              Our mission is to make quality educational resources accessible and affordable to everyone, from primary school students to university graduates and professionals.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-check-circle mt-1 text-[var(--teal)] text-xl"></i>
                <div>
                  <h3 className="font-semibold text-[var(--navy)]">Quality Products</h3>
                  <p className="text-sm text-gray-600">Only authentic, verified educational materials</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-check-circle mt-1 text-[var(--teal)] text-xl"></i>
                <div>
                  <h3 className="font-semibold text-[var(--navy)]">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">Swift delivery across Nairobi and Kenya</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-check-circle mt-1 text-[var(--teal)] text-xl"></i>
                <div>
                  <h3 className="font-semibold text-[var(--navy)]">Excellent Customer Service</h3>
                  <p className="text-sm text-gray-600">Support available 24/7 via WhatsApp and email</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-check-circle mt-1 text-[var(--teal)] text-xl"></i>
                <div>
                  <h3 className="font-semibold text-[var(--navy)]">Multiple Payment Options</h3>
                  <p className="text-sm text-gray-600">M-Pesa, bank transfer, and Cash on Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <section className="mt-16 border-t border-border pt-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-[var(--navy)]">Why Choose JSEdumart?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-border p-6 text-center">
              <div className="mb-4 text-4xl text-[var(--yellow)]">
                <i className="fa-solid fa-book"></i>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--navy)]">Wide Selection</h3>
              <p className="text-gray-600">Thousands of titles covering all educational levels and subjects</p>
            </div>

            <div className="rounded-lg border border-border p-6 text-center">
              <div className="mb-4 text-4xl text-[var(--teal)]">
                <i className="fa-solid fa-truck"></i>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--navy)]">Reliable Shipping</h3>
              <p className="text-gray-600">Fast and secure delivery with real-time tracking</p>
            </div>

            <div className="rounded-lg border border-border p-6 text-center">
              <div className="mb-4 text-4xl text-[var(--green)]">
                <i className="fa-solid fa-shield"></i>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--navy)]">Trust & Security</h3>
              <p className="text-gray-600">Secure payments and authentic products guaranteed</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-16 rounded-lg bg-[var(--navy)] p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>
          <p className="mb-6 text-white/80">Have questions? We'd love to hear from you!</p>
          <Link href="/contact">
            <Button className="bg-[var(--yellow)] text-[var(--navy)] hover:bg-[var(--yellow)]/90">
              Contact Us Today
            </Button>
          </Link>
        </section>
      </div>
    </div>
  )
}
