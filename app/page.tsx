"use client"

import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FlashDealsSection } from "@/components/home/flash-deals-section"
import { FeaturedSection } from "@/components/home/featured-section"
import { ServicesSection } from "@/components/home/services-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CategoriesSection />
      <FlashDealsSection />
      <FeaturedSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
