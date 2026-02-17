"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    id: "1",
    question: "What payment methods do you accept?",
    answer:
      "We accept M-Pesa, bank transfer, and Cash on Delivery (COD). Payment options are available during checkout. For large orders, we can arrange special payment plans.",
  },
  {
    id: "2",
    question: "How long does delivery take?",
    answer:
      "For customers in Nairobi CBD, delivery is free and typically takes 1-2 business days. For other areas, delivery times may vary. We provide real-time tracking for all orders.",
  },
  {
    id: "3",
    question: "Do you deliver outside Nairobi?",
    answer:
      "Yes, we deliver across Kenya! Delivery times and costs vary by location. Contact us at +254 704 454556 for specific delivery information to your area.",
  },
  {
    id: "4",
    question: "What is your return policy?",
    answer:
      "We accept returns within 7 days of purchase for damaged or defective items. Items must be in original condition. Contact our customer service team for return instructions.",
  },
  {
    id: "5",
    question: "Can I track my order?",
    answer:
      "Yes! Once your order is dispatched, you'll receive a tracking number. You can also reach us via WhatsApp for real-time order updates.",
  },
  {
    id: "6",
    question: "Are all your books authentic?",
    answer:
      "Absolutely! We source all our books directly from authorized publishers and distributors. Every product is verified for authenticity before dispatch.",
  },
  {
    id: "7",
    question: "Do you offer wholesale or bulk discounts?",
    answer:
      "Yes, we offer special pricing for bulk orders and institutional purchases. Please contact us at jsbookshop4@gmail.com for wholesale inquiries.",
  },
  {
    id: "8",
    question: "How can I contact customer support?",
    answer:
      "You can reach us via WhatsApp (+254 704 454556), email (jsbookshop4@gmail.com), or phone. Our support team is available Monday-Saturday.",
  },
  {
    id: "9",
    question: "Do you have a physical store?",
    answer:
      "Currently, we operate as an online bookstore with delivery across Kenya. We're based in Nairobi CBD. Visit us online or contact us for appointments.",
  },
  {
    id: "10",
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled within 24 hours of placement. After that, if your order hasn't been shipped, we may still be able to help. Contact us immediately.",
  },
]

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90">Find answers to common questions about ordering and shipping</p>
        </div>
      </section>

      {/* FAQ Content */}
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="mb-8 text-center text-gray-600">
          Can't find the answer you're looking for?{" "}
          <a href="/contact" className="font-semibold text-[var(--teal)] hover:underline">
            Contact our support team
          </a>
        </p>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border border-border rounded-lg px-6">
              <AccordionTrigger className="py-4 text-left font-semibold text-[var(--navy)] hover:text-[var(--teal)]">
                <i className="fa-solid fa-question-circle mr-3 text-[var(--teal)]"></i>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Section */}
        <div className="mt-16 rounded-lg bg-[var(--navy)]/5 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-[var(--navy)]">Still have questions?</h2>
          <p className="mb-6 text-gray-600">Get in touch with our friendly customer support team</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/254704454556"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--green)] px-6 py-3 text-white font-semibold hover:bg-[var(--green)]/90 transition-colors"
            >
              <i className="fa-brands fa-whatsapp"></i>
              WhatsApp
            </a>
            <a
              href="mailto:jsbookshop4@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--teal)] px-6 py-3 text-white font-semibold hover:bg-[var(--teal)]/90 transition-colors"
            >
              <i className="fa-solid fa-envelope"></i>
              Email Us
            </a>
            <a
              href="tel:+254704454556"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--navy)] px-6 py-3 text-white font-semibold hover:bg-[var(--navy)]/90 transition-colors"
            >
              <i className="fa-solid fa-phone"></i>
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
